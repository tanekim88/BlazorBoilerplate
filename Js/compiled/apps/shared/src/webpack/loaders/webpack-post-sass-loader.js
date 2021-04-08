"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function webpackPostSassLoader(source, map) {
    source = source.replace(/\/\*PRESASSLOADER/gm, '');
    source = source.replace(/POSTSASSLOADER\*\//gm, '');
    this.callback(null, source, map);
}
exports.default = webpackPostSassLoader;
//# sourceMappingURL=webpack-post-sass-loader.js.map