export default function webpackPrePostcssLoader(source, map) {
    source = source.replace(/#{(\$[\w-_]+)}/gm, '#($1)');
    this.callback(null, source, map);
}
//# sourceMappingURL=webpack-pre-postcss-loader.js.map