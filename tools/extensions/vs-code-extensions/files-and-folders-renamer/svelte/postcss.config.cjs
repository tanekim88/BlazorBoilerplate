const mode = process.env.NODE_ENV;
const dev = mode === "development";

const config = {
    syntax: 'postcss-scss',
	plugins: [
		require('postcss-import'),
		require('tailwindcss/nesting'),
		require('tailwindcss'),
		require('autoprefixer'),
        // !dev && require('cssnano')({
        //   preset: 'default'
        // })
	],
};

module.exports = config;
