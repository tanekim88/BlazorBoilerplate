const color = require('css-color-converter');

export const customDarken = (value, frac) => {
    const darken = 1 - parseFloat(frac);
    const rgba = color(value).toRgbaArray();
    const r = rgba[0] * darken;
    const g = rgba[1] * darken;
    const b = rgba[2] * darken;
    return color([r, g, b]).toHexString();
};
