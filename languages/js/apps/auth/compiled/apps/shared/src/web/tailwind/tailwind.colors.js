"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.texts = exports.colors = exports.tailwindColors = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const color_1 = require("./utils/color");
const deepmerge_1 = __importDefault(require("deepmerge"));
const export_1 = require("../material/variables/export");
const node_sass_1 = __importDefault(require("node-sass"));
const lodash_1 = __importDefault(require("lodash"));
const colorsInput = export_1.materialVariables['$colors-input'];
const textsInput = export_1.materialVariables['$texts-input'];
const materialColors = export_1.materialVariables['$material-colors'];
const subTypes = export_1.materialVariables['$color-types'];
const textColorSchemes = export_1.materialVariables['$text-color-schemes'];
const textLinkColorsInput = export_1.materialVariables['$text-links-input'];
console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
console.dir(export_1.materialVariables);
const lightenDarkenDegree = 15;
const customColors = color_1.generate(colorsInput);
const convertedMaterialColors = Object.keys(materialColors).reduce((acc, curr) => {
    const lastIndexOf = curr.lastIndexOf('-');
    if (!acc[curr] && lastIndexOf === -1) {
        acc[curr] = {
            DEFAULT: materialColors[curr],
        };
    }
    if (lastIndexOf !== -1) {
        const label = curr.substr(0, lastIndexOf);
        const subLabel = curr.substr(lastIndexOf + 1);
        if (acc[label]) {
            if (subLabel == '500') {
                acc[label]['DEFAULT'] = materialColors[curr];
            }
            acc[label][subLabel] = materialColors[curr];
        }
    }
    return acc;
}, {});
Object.keys(colorsInput).forEach((key) => {
    const color = colorsInput[key];
    if (convertedMaterialColors[color]) {
        subTypes.forEach((num) => {
            if (customColors[key] && convertedMaterialColors[color] && convertedMaterialColors[color][num]) {
                customColors[key][num] = convertedMaterialColors[color][num];
            }
        });
    }
    customColors[key]['DEFAULT'] = customColors[key][500];
});
exports.tailwindColors = deepmerge_1.default(convertedMaterialColors, customColors);
exports.colors = Object.keys(exports.tailwindColors).reduce((acc, curr) => {
    const color = exports.tailwindColors[curr];
    const toReturn = Object.keys(color).reduce((acc2, curr2) => {
        const finalColor = color[curr2];
        let key = curr;
        if (curr2 !== 'DEFAULT') {
            key += `-${curr2}`;
        }
        acc2[key] = finalColor;
        return acc2;
    }, {});
    Object.assign(acc, toReturn);
    return acc;
}, {});
// export const colorsUtilities = {};
exports.texts = Object.keys(exports.colors).reduce((acc, label) => {
    const color = exports.colors[label];
    const isDark = isColorDark(color);
    const textColor = textsInput[isDark ? 'light' : 'dark'];
    const textLinkColor = textLinkColorsInput[isDark ? 'light' : 'dark'];
    acc[`on-${label}`] = getCssObj(textColor.primary);
    acc[`link-on-${label}`] = getCssObj(textLinkColor.primary);
    acc[`hover-on-link-on-${label}`] = textLinkColor.primary['&:hover'];
    textColorSchemes.forEach((textColorScheme) => {
        acc[`text-${textColorScheme}-on-${label}`] = getCssObj(textColor[textColorScheme]);
        acc[`link-${textColorScheme}-on-${label}`] = getCssObj(textLinkColor[textColorScheme]);
        acc[`hover-on-link-${textColorScheme}-on-${label}`] = textLinkColor[textColorScheme]['&:hover'];
    });
    return acc;
}, {});
function isColorDark(color) {
    const c = /color:\s*(.+);/m.exec(node_sass_1.default.renderSync({ data: `body{color:${color}}`, outputStyle: 'compact' }).css.toString())[1];
    return tinycolor2_1.default(c).isDark();
}
function getCssObj(obj) {
    return lodash_1.default.omitBy(obj, (value, key) => {
        return key.startsWith('&');
    });
}
//# sourceMappingURL=tailwind.colors.js.map