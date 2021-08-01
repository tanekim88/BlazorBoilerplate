import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import adapterStatic from '@sveltejs/adapter-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outDir = path.resolve(__dirname, '..', 'out');
const buildDirPath = path.resolve(outDir, 'svelte');
const _appDirPath = path.resolve(buildDirPath, '_app');

const cspSource = '@cspSource';

export function customAdapterStatic({ pages = 'build', assets = pages, fallback } = {}) {
	/** @type {import('@sveltejs/kit').Adapter} */
	const adapter = {
		name: '@sveltejs/adapter-static',

		async adapt(args) {
			if (fs.existsSync(buildDirPath)) {
				fs.rmSync(buildDirPath, { recursive: true });
			}

			await adapterStatic({
				pages,
				assets,
				fallback
			}).adapt(args);

			const nonce = getNonce();

			const startJsFileBasename = fs
				.readdirSync(_appDirPath)
				.filter((f) => f.startsWith('start-'))[0];
			if (startJsFileBasename) {
				const startJsFilePath = path.join(_appDirPath, startJsFileBasename);
				let startJsFileContent = fs.readFileSync(startJsFilePath, { encoding: 'utf8' });
				startJsFileContent = startJsFileContent.replace(
					/const base = .*/,
					`const base = "@_appDirPath/";`
				);

				fs.writeFileSync(startJsFilePath, startJsFileContent);
			}

			for await (const file of getFiles(buildDirPath)) {
				if (path.basename(file) !== 'index.html') {
					continue;
				}

				const indexHtmlPath = file;
				let html = fs.readFileSync(indexHtmlPath, { encoding: 'utf8' });

				const headerHtmlBody = `
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; style-src 'unsafe-inline' ${cspSource}; script-src 'nonce-${nonce}' ${cspSource};">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<script nonce="${nonce}">
					const tsvscode = acquireVsCodeApi();
				</script>`;

				const bodyHtml = ``;
				html = html.replace(/<script(\W)/g, `<script nonce="${nonce}"$1`);
				html = html.replace(/<styles(\W)/g, `<styles nonce="${nonce}"$1`);
				html = html.replace(/<link(\W)/g, `<link nonce="${nonce}"$1`);

				html = html.replace('</head>', `${headerHtmlBody}</head>`);
				html = html.replace('</body>', `${bodyHtml}</body>`);
				// update the base URI tag
				html = html.replace('<base href="/">', `<base href="@buildDirPath/">`);

				html = html.replace(/\/\.\/_app\/[^"]*/g, (match) => {
					const relative = match.replace('/./_app/', `./_app/`);

					return relative;
				});

				fs.writeFileSync(indexHtmlPath, html);
			}
		}
	};

	return adapter;
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

const resolve = path.resolve;
const readdir = fs.promises.readdir;

async function* getFiles(dir) {
	const dirents = await readdir(dir, { withFileTypes: true });
	for (const dirent of dirents) {
		const res = resolve(dir, dirent.name);
		if (dirent.isDirectory()) {
			yield* getFiles(res);
		} else {
			yield res;
		}
	}
}
