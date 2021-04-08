"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader_utils_1 = require("loader-utils");
function webpackPostPostcssLoader(source, map) {
    const options = loader_utils_1.getOptions(this);
    source = source.replace(/#\((\$[\w-_]+)\)/gm, '#{$1}');
    this.callback(null, source, map);
}
exports.default = webpackPostPostcssLoader;
//# sourceMappingURL=webpack-post-postcss-loader.js.map