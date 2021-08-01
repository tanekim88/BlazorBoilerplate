const virtualFileId = '@my-virtual-file'
export function getViteConfig(){
	return ({
		plugins:[
			// {
			// 	name:'asdf',
			// 	resolveId(id){
			// 		console.dir('??????????')
			// 		console.log(id);
			// 		if (id === virtualFileId) {
			// 			return virtualFileId
			// 		  }
			// 		// return id;
			// 	},
			// 	load(id){
			// 		if (id === virtualFileId) {
			// 			return `export const msg = "from virtual file"`
			// 		  }
			// 	}
			// }
			
		],
		// plugins: [
		// 	{
		// 		name: 'vite:singlefile',
		// 		transformIndexHtml: {
		// 			enforce: 'post',
		// 			transform(html, ctx) {
		// 				console.log('111111111111111111111111');
		// 				// Only use this plugin during build
		// 				if (!ctx || !ctx.bundle) return html;
		// 				// Get the bundle
		// 				let extraCode = '';
		// 				for (const [, value] of Object.entries(ctx.bundle)) {
		// 					const o = value;
		// 					const a = value;
		// 					if (o.code) {
		// 						const reScript = new RegExp(
		// 							`<script type="module"[^>]*?src="/${value.fileName}"[^>]*?></script>`
		// 						);
		// 						const code = `<script type="module">\n//${o.fileName}\n${o.code}\n</script>`;
		// 						html = html.replace(reScript, (_) => code);
		// 					} else if (value.fileName.endsWith('.css')) {
		// 						const reCSS = new RegExp(
		// 							`<link rel="stylesheet"[^>]*?href="/${value.fileName}"[^>]*?>`
		// 						);
		// 						const code = `<!-- ${a.fileName} --><style type="text/css">\n${a.source}\n</style>`;
		// 						html = html.replace(reCSS, (_) => code);
		// 					} else {
		// 						extraCode += '\n<!-- ASSET NOT INLINED: ' + a.fileName + ' -->\n';
		// 					}
		// 				}
		// 				return html.replace(/<\/body>/, extraCode + '</body>');
		// 			}
		// 		}
		// 	},
		// 	{
		// 		name: 'transform-file',
		// 		enforce: 'post',
		// 		transform(src, id) {
		// 			if (/\.(js|ts)$/.test(id)) {
		// 				console.log('000000000000');
		// 				const parentDir = path.dirname(id);
		// 				console.dir(parentDir);
		// 				console.dir(id);
		// 				if (id.indexOf('.svelte-kit') !== -1) {
		// 					src = src.replace(
		// 						/(?<=from\s*['"]|\Wimport\s*\(\s*['"])(?<path>\.[^"']+)/g,
		// 						(url) => {
		// 							const absPath = path.resolve(parentDir, url);

		// 							const encodedUrl = encodeURIComponent(absPath);
		// 							const finalPath = path.join(
		// 								'https://file%2B.vscode-resource.vscode-webview.net',
		// 								encodedUrl
		// 							);

		// 							const linuxPath = finalPath.split(path.sep).join(path.posix.sep);
		// 							console.log('11111111111111111111111');
		// 							console.log(absPath);
		// 							console.log('22222222222222222222222');
		// 							console.log(encodedUrl);
		// 							console.log('3333333333333333333333');
		// 							console.log(finalPath);
		// 							console.log('4444444444444444444');
		// 							console.log(linuxPath);
		// 							return linuxPath;
		// 						}
		// 					);
		// 				}

		// 				return {
		// 					code: src,
		// 					map: null // provide source map if available
		// 				};
		// 			}
		// 		}
		// 	}
		// ],
		build: {
			cssCodeSplit: false,
			// assetsInlineLimit: 100000000,
			rollupOptions: {
				// inlineDynamicImports: true,
			},
			minify:false
		},
		optimizeDeps:{
			esbuildOptions:{
				keepNames:true
			},
		}
	})
}