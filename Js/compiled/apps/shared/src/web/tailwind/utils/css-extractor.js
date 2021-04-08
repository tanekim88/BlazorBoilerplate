"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractor = void 0;
const compiler_1 = __importDefault(require("svelte/compiler"));
const { parse, walk } = compiler_1.default;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
function getProp(node, attr) {
    if (!node.attributes)
        return false;
    return (node.attributes.find((a) => a.name === attr) || {}).value;
}
function getPath(name, root = './src/components') {
    return path_1.default.resolve(root, name, 'variants.js');
}
const defs = {};
function getComponent(name) {
    try {
        let componentPath = getPath(name);
        if (!fs_1.default.existsSync(componentPath)) {
            componentPath = getPath(name, './node_modules/smelte/src/components');
        }
        return require(componentPath);
    }
    catch (e) {
        return {
            all: (color) => [`text-${color}-500`],
        };
    }
}
function getComponentCodes(name) {
    const root = ['./src/components', './node_modules/smelte/src/components'].filter((v) => fs_1.default.existsSync(v));
    return flatten(root.map((v) => {
        const dir = fs_1.default.readdirSync(v);
        return dir
            .filter((w) => fs_1.default.readdirSync(path_1.default.join(v, w)).includes(name + '.svelte'))
            .map((w) => path_1.default.join(v, w, name + '.svelte'));
    }));
}
function classesPerComponent(colors) {
    return Object.keys(colors).reduce((acc, component) => {
        const def = defs[component] || getComponent(component);
        defs[component] = def;
        const classes = [...colors[component]].map((c) => Object.keys(def).map((k) => def[k](c)));
        return [...acc, ...classes];
    }, []);
}
// whitelist does not seem to work with custom extractors!?!
// so hardcode it
const whitelist = [
    'html',
    'body',
    'stroke-primary',
    'mode-dark',
    // /ripple/
    'ripple',
    'ripple-normal',
    'ripple-centered',
    // /w\-.\/7/
    ...flatten(['xl:w', 'lg:w', 'md:w', 'sm:w', 'w'].map((v) => [1, 2, 3, 4, 5, 6].map((w) => v + '-' + w + '/7'))),
];
function extractor(content, ownColors = ['primary', 'white', 'gray']) {
    let ast;
    const usedColors = {};
    const usedComponents = new Set();
    try {
        ast = parse(content);
    }
    catch { }
    walk(ast, {
        enter: function (node) {
            const color = getProp(node, 'color');
            if (node.type === 'InlineComponent') {
                usedComponents.add(node.name);
                // catch default colors
                if (!usedColors[node.name]) {
                    usedColors[node.name] = new Set(ownColors);
                }
            }
            if (color && color[0].data) {
                if (!usedColors[node.name]) {
                    usedColors[node.name] = new Set(ownColors);
                }
                usedColors[node.name].add(color[0].data);
            }
        },
    });
    const fromClasses = content.match(/class:[A-Za-z0-9-_]+/g) || [];
    const defaultComponentClasses = content.match(/lasses = ("[a-zA-Z0-9-_ ]+")/g) || [];
    // TODO: Each used component is crawled once per .svelte file.
    // Could improve performance by globally tracking which component/colors are
    // already checked
    const recursiveCrawl = [...usedComponents].map((v) => {
        const cont = getComponentCodes(v);
        return cont.map((w) => extractor(fs_1.default.readFileSync(w, { encoding: 'utf-8' }), usedColors[v]));
    });
    return [
        ...flatten(recursiveCrawl),
        ...(content.match(/[A-Za-z0-9-_:\/]+/g) || []),
        ...fromClasses.map((c) => c.replace('class:', '')),
        ...flatten(classesPerComponent(usedColors)),
        ...defaultComponentClasses.map((c) => c.replace('lasses = "', '').replace('"', '')),
        ...whitelist,
    ];
}
exports.extractor = extractor;
//# sourceMappingURL=css-extractor.js.map