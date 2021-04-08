"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("@shared/paths");
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const dirPath = paths_1.sharedPaths.src.web.material.native.toAbsolutePath();
let from = '_temp_';
let to = '_final_';
glob_1.default.sync(path_1.default.join(dirPath, '**/*_*_.*')).forEach((file) => {
    const newPath = file.replace(new RegExp(from + '(\\.\\w+)$'), to + '$1');
    fs_1.default.renameSync(file, newPath);
});
//# sourceMappingURL=rename.js.map