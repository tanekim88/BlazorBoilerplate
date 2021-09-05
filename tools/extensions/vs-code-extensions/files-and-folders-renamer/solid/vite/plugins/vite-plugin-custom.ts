
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import adapterStatic from '@sveltejs/adapter-static';
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export default function customPlugin(args) {
    const { buildDirPath } = args;
    const cspSource = '@cspSource';
    return {
        name: 'custom', // required, will show up in warnings and errors
        transformIndexHtml(html) {
            if (fs.existsSync(buildDirPath)) {
                fs.rmSync(buildDirPath, { recursive: true });
            }

            const nonce = getNonce();

            const headerHtmlBody = `
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; style-src 'unsafe-inline' ${cspSource}; script-src 'nonce-${nonce}' ${cspSource};">
				<script nonce="${nonce}">
					const webview = acquireVsCodeApi();
				</script>`;

            const bodyHtml = ``;
            html = html.replace(/<script(\W)/g, `<script nonce="${nonce}"$1`);
            html = html.replace(/<styles(\W)/g, `<styles nonce="${nonce}"$1`);
            html = html.replace(/<link(\W)/g, `<link nonce="${nonce}"$1`);

            html = html.replace('</head>', `${headerHtmlBody}</head>`);
            html = html.replace('</body>', `${bodyHtml}</body>`);
            html = html.replace(/\/assets\//g, `./assets/`);

            return html;
        }
    }
}