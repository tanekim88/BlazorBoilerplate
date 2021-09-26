import tinycolor from 'tinycolor2';
import { generate } from './utils/color';
import deepmerge from 'deepmerge';
import { materialVariables } from '../material/variables/export';
import sass from 'node-sass';
import _ from 'lodash';

const colorsInput = materialVariables['$colors-input'];
const textsInput = materialVariables['$texts-input'];
const materialColors = materialVariables['$material-colors'];
const subTypes = materialVariables['$color-types'];
const textColorSchemes = materialVariables['$text-color-schemes'];
const textLinkColorsInput = materialVariables['$text-links-input'];
console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
console.dir(materialVariables);

const lightenDarkenDegree = 15;

const customColors = generate(colorsInput);

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

export const tailwindColors = deepmerge(convertedMaterialColors, customColors);

export const colors = Object.keys(tailwindColors).reduce((acc, curr) => {
    const color = tailwindColors[curr];

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

export const texts = Object.keys(colors).reduce((acc, label) => {
    const color = colors[label];

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
    const c = /color:\s*(.+);/m.exec(
        sass.renderSync({ data: `body{color:${color}}`, outputStyle: 'compact' }).css.toString(),
    )[1];

    return tinycolor(c).isDark();
}

function getCssObj(obj) {
    return _.omitBy(obj, (value, key) => {
        return key.startsWith('&');
    });
}
