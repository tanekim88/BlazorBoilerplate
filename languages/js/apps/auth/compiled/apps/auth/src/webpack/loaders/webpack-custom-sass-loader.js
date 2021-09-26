"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sass_loader_1 = __importDefault(require("sass-loader"));
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
const db = {};
exports.default = function loader(content) {
    const id = sanitize_filename_1.default(this.resourcePath, {
        replacement: '_',
    });
    const localSet = new Set();
    const originalAddDependency = this.addDependency.bind(this);
    if (!this.addDependency['done']) {
        this.addDependency = (dependency) => {
            if (dependency && dependency.indexOf('node_modules') === -1) {
                localSet.add(dependency);
            }
            originalAddDependency(dependency);
        };
    }
    this.addDependency['done'] = true;
    const originalAsync = this.async.bind(this);
    const callback = originalAsync();
    if (!this.async['done']) {
        this.async = () => {
            return (error, result, map) => {
                console.log('))))))))))))))))))))))))))))');
                if (error) {
                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                    console.dir(db);
                    let dbData = db[id] ?? localSet;
                    if (dbData && dbData.size) {
                        dbData.forEach((dependency) => {
                            this.addDependency(dependency);
                        });
                    }
                }
                else {
                    db[id] = localSet;
                }
                return callback(error, result, map);
            };
        };
    }
    this.async['done'] = true;
    const sassLoader2 = sass_loader_1.default.bind(this);
    sassLoader2(content);
};
//# sourceMappingURL=webpack-custom-sass-loader.js.map