"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const paths_1 = require("@root/paths");
const dirPath = paths_1.rootPaths.toAbsolutePath();
glob_1.default.sync(path_1.default.join(dirPath, '**/*.temp.txt')).forEach((file) => {
    fs_1.default.unlinkSync(file);
});
//# sourceMappingURL=remove_txt.js.map