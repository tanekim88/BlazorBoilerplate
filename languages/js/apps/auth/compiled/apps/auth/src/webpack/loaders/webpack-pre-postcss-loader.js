"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function webpackPrePostcssLoader(source, map) {
    source = source.replace(/#{(\$[\w-_]+)}/gm, '#($1)');
    this.callback(null, source, map);
}
exports.default = webpackPrePostcssLoader;
//# sourceMappingURL=webpack-pre-postcss-loader.js.map