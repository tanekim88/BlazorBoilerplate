import { sharedPaths } from '#shared/paths';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
const dirPath = sharedPaths.src.web.material.components.toAbsolutePath();
glob.sync(path.join(dirPath, '**/index.ts')).forEach((file) => {
    const newPath = file.replace(/([^_])(index.ts)$/, '$1_$2');
    fs.renameSync(file, newPath);
});
//# sourceMappingURL=rename-index-ts-to-_index-ts.js.map