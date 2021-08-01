import preprocess from 'svelte-preprocess';

import { getViteConfig } from './vite-config.js';
import {customAdapterStatic} from './custom-adapter-static.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// options passed to svelte.compile (https://svelte.dev/docs#svelte_compile)
	compilerOptions: {},

	// an array of file extensions that should be treated as Svelte components
	extensions: ['.svelte'],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: customAdapterStatic({
					assets: 'build',
					pages: 'build',
					fallback: null
				}),
		amp: false,
		// appDir: '_app',
		files: {
			assets: 'static',
			hooks: 'src/hooks',
			lib: 'src/lib',
			routes: 'src/routes',
			serviceWorker: 'src/service-worker',
			template: 'src/app.html'
		},
		floc: false,
		// host: null,
		// hostHeader: null,
		// hydrate unless disabled on page
		hydrate: async ({ page }) => {
			const leaf = await page;
			return 'hydrate' in leaf ? !!leaf.hydrate : true;
		},
		package: {
			dir: 'package',
			emitTypes: true,
			exports: {
				include: ['**'],
				exclude: ['_*', '**/_*']
			},
			files: {
				include: ['**'],
				exclude: []
			}
		},
		paths: {
			assets: '',
			base: ''
		},
		// prerender: {
		// 	crawl: true,
		// 	// don't prerender unless enabled on page
		// 	enabled: expect_page_scriptable(async ({ page }) => !!(await page).prerender),
		// 	onError: 'fail',
		// 	pages: ['*']
		// },
		// route unless disabled on page
		router: async ({ page }) => {
			const leaf = await page;
			return 'router' in leaf ? !!leaf.router : true;
		},
		serviceWorker: {
			exclude: []
		},
		// do SSR unless disabled on page
		// ssr: async ({ page }) => {
		// 	const leaf = await page;
		// 	return 'ssr' in leaf ? !!leaf.ssr : true;
		// },
		ssr: true,
		trailingSlash: 'never',
		vite: getViteConfig()
	},
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess()
};

export default config;

