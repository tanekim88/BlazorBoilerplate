"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function webpackPreSassLoader(source, map) {
    source = source.replace(/\/\/PRESASSLOADER/gm, '/*PRESASSLOADER');
    source = source.replace(/\/\/POSTSASSLOADER/gm, 'POSTSASSLOADER*/');
    this.callback(null, source, map);
}
exports.default = webpackPreSassLoader;
//# sourceMappingURL=webpack-pre-sass-loader.js.map