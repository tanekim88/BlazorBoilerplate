"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialVariables = void 0;
const sass_export_1 = require("sass-export");
const paths_1 = require("@shared/paths");
const scss_parser_1 = __importDefault(require("scss-parser"));
const node_sass_1 = __importDefault(require("node-sass"));
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const options = {
    inputFiles: [
        paths_1.sharedPaths.src.web.material.variables['_material-colors.scss'].toAbsolutePath(),
        paths_1.sharedPaths.src.web.material.variables['_color-types.scss'].toAbsolutePath(),
        paths_1.sharedPaths.src.web.material.variables['_texts-input.scss'].toAbsolutePath(),
        paths_1.sharedPaths.src.web.material.variables['_colors-input.scss'].toAbsolutePath(),
        paths_1.sharedPaths.src.web.material.variables['_text-color-schemes.scss'].toAbsolutePath(),
    ],
};
// import toExport from './index.json';
const toExport = sass_export_1.exporter(options).getStructured();
function parseAst(ast) {
    const toReturn = {};
    switch (ast.type) {
        case 'stylesheet':
            return parseAst(ast.value[0]);
        case 'parentheses':
            ast.value
                .filter((v) => v.type !== 'space')
                .forEach((declaration) => {
                toReturn[declaration.value[0].value[0].value] = parseAst(declaration.value[2]);
            });
            return toReturn;
        case 'value':
            if (ast.value.filter) {
                ast.value = ast.value.filter((v) => v.type !== 'space');
            }
            return parseAst(ast.value[0]);
        case 'identifier':
            return ast.value;
        case 'variable':
            return `$${ast.value}`;
        case 'function':
            const args = ast.value[1].value
                .filter((v) => v.type !== 'punctuation' && v.type !== 'space')
                .map((v) => parseAst(v));
            const ident = ast.value[0].value;
            const finalFunction = `${ident}(${args.join(',')})`;
            if (/^rgba?$/.test(ident)) {
                return getHexColor(finalFunction);
            }
            return finalFunction;
        case 'attribute':
            return ast.value.filter((v) => v.type !== 'punctuation').map((v) => parseAst(v));
        case 'color_hex':
            return `#${ast.value}`;
        case 'string_double':
        case 'number':
        default:
            return ast.value;
    }
}
exports.materialVariables = toExport.variables.reduce((acc, curr) => {
    // const jsName = changeCase.camelCase(curr.nam);
    const jsName = curr.name;
    if (curr.mapValue) {
        const parsed = parseAst(scss_parser_1.default.parse(curr.value));
        acc[jsName] = parsed;
    }
    else if (/\s?,\s+/.test(curr.compiledValue)) {
        acc[jsName] = curr.compiledValue.split(/\s?,\s+/);
    }
    else {
        acc[jsName] = curr.compiledValue;
    }
    return acc;
}, {});
function getHexColor(color) {
    const c = /color:\s*(.+);/m.exec(node_sass_1.default.renderSync({ data: `body{color:${color}}`, outputStyle: 'compact' }).css.toString())[1];
    return tinycolor2_1.default(c).toHexString();
}
//# sourceMappingURL=export.js.map