export default function webpackPostSassLoader(source, map) {
    source = source.replace(/\/\*PRESASSLOADER/gm, '');
    source = source.replace(/POSTSASSLOADER\*\//gm, '');
    this.callback(null, source, map);
}
//# sourceMappingURL=webpack-post-sass-loader.js.map