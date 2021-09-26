
import fs from 'fs';
import packageJson from '../package.json';

import path from 'path';
import './generate-paths';
import symlinkDir from 'symlink-dir';
import { rootConfig } from '../configs';
import normalizePath from 'normalize-path';
import { renameExtension } from '#shared/src/functions/rename-extension';

const final = {
    lint: 'eslint "*/**/*.{js,ts,tsx}" --quiet --fix',
};
const rootDir = rootConfig.rootDir;
const rootProjName = 'root'
const appsDir = path.resolve(rootDir, 'apps');
const childs = fs.readdirSync(appsDir).map(appDir => {
    const absDir = path.resolve(appsDir, appDir);
    const packageJsonPath = path.resolve(absDir, 'package.json');
    const packageJsonStr = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonStr);
    const absAppDir = path.join(appsDir, appDir)
    const rel = normalizePath(path.relative(rootDir, absAppDir));
    return {
        folderName: appDir,
        packageJson: packageJson,
        relativeFolderPath: rel,
        absoluteFolderPath: path.join(appsDir, appDir)
    }
});

const appDirNames = childs.map((x) => x.folderName);

const commandObjs = [
    {
        name: 'setup',
        command: 'node  --loader ts-node/esm --experimental-specifier-resolution=node ./scripts/generate-scripts.ts',
        includes: [''],
    },
    {
        name: 'prebuild',
        command: 'rimraf dist',
        includes: [...appDirNames],
    },
    {
        name: 'build',
        command: 'nest build',
        includes: [...appDirNames],
    },
    {
        name: 'format',
        command: 'prettier --write "src/**/*.ts" "test/**/*.ts"',
        includes: [...appDirNames],
    },
    {
        name: 'start',
        command: 'nest start',
        includes: [...appDirNames],
    },
    {
        name: 'start:dev',
        command: 'nest start --watch --debug --progress',
        includes: [...appDirNames],
    },
    {
        name: 'start:debug',
        command: 'nest start --debug --watch',
        includes: [...appDirNames],
    },
    {
        name: 'start:prod',
        command: 'node dist/main',
        includes: [...appDirNames],
    },
    {
        name: 'test',
        command: 'jest',
        includes: [...appDirNames],
    },
    {
        name: 'test:watch',
        command: 'jest --watch',
        includes: [...appDirNames],
    },
    {
        name: 'test:cov',
        command: 'jest --coverage',
        includes: [...appDirNames],
    },
    {
        name: 'test:debug',
        command: 'node --inspect-brk --loader ts-node/esm --experimental-specifier-resolution=node node_modules/.bin/jest --runInBand',
        includes: [...appDirNames],
    },
    {
        name: 'test:e2e',
        command: 'jest --config ./test/jest-e2e.json',
        includes: [...appDirNames],
    },
    {
        name: 'lint',
        // command: "eslint '*/**/*.{js,ts,tsx}' --quiet --fix",
        command:
            'cross-env NODE_OPTIONS=--max_old_space_size=4096 eslint **/*.ts --fix --no-eslintrc -c .eslintrc.json',
        includes: [...appDirNames],
    },
    /////////////////////////////////////////////////////////////////////////////////////////////
    {
        name: 'build:vite',
        command:
            // 'cross-env TS_NODE_PROJECT="tsconfig.json" vite --mode development --config vite.dev.ts  -r ts-node/register --config-register tsconfig-paths/register',
            'cross-env NODE_OPTIONS="--max_old_space_size=4096 --loader ts-node/esm" --experimental-specifier-resolution=node vite --mode=development --config vite.dev.ts',
        includes: [...appDirNames],
    },
    {
        name: 'build:prod:vite',
        command:
            'cross-env NODE_OPTIONS="--max_old_space_size=4096 --loader ts-node/esm" --experimental-specifier-resolution=node vite --mode=production --config vite.prod.ts',
        includes: [...appDirNames],
    },
    {
        name: 'watch:vite',
        command:
            'cross-env NODE_OPTIONS="--max_old_space_size=4096 --loader ts-node/esm" --experimental-specifier-resolution=node vite --mode=development --watch --config vite.dev.ts',
        includes: [...appDirNames],
    },
    {
        name: 'watch:prod:vite',
        command:
            'cross-env NODE_OPTIONS="--max_old_space_size=4096 --loader ts-node/esm" --experimental-specifier-resolution=node vite --mode=production --watch --config vite.prod.ts',
        includes: [...appDirNames],
    },
    {
        name: 'start:pwa',
        command: 'http-server dist',
        includes: [...appDirNames],
    },
    {
        name: 'watch',
        command: '',
        includes: [...appDirNames],
    },
    {
        name: 'watch:dotnet',
        command: 'dotnet watch run',
        includes: [...appDirNames],
    },
    {
        name: 'inst',
        command: 'npm install',
        includes: ['', ...appDirNames],
    },
    {
        name: 'inst:force',
        command: 'npm install --force',
        includes: ['', ...appDirNames],
    },
    {
        name: 'uninst',
        command: 'npm uninstall',
        includes: ['', ...appDirNames],
    },

    {
        name: 'init',
        command: 'npm install -D concurrently npm-run-all',
        includes: ['', ...appDirNames],
    },
    {
        name: 'nuke',
        command: 'rimraf node_modules',
        includes: ['', ...appDirNames],
    },
    {
        name: 'reset',
        command: 'npm run nuke && npm run init && npm run inst',
        includes: ['', ...appDirNames],
    },
    {
        name: 'generate:paths',
        command: 'node --loader ts-node/esm --experimental-specifier-resolution=node ./scripts/generate-paths.ts',
        includes: [''],
    },
];

commandObjs.forEach((commandObj) => {
    let scriptForAll = 'npm-run-all --parallel ';

    if (commandObj.includes.indexOf('') !== -1) {
        scriptForAll += '"{commandName} -- {@}" '.replace('{commandName}', `${commandObj.name}`);
    }

    final[`${commandObj.name}`] = commandObj.command;

    childs.forEach((target) => {
        final[`${commandObj.name}:${target.folderName}`] = `cd ${target.relativeFolderPath ?? target.folderName
            } && npm run {commandName}`.replace('{commandName}', commandObj.name);

        if (commandObj.includes.indexOf(target.folderName) !== -1) {
            scriptForAll += '"{commandName} -- {@}" '.replace(
                '{commandName}',
                `${commandObj.name}:${target.folderName}`,
            );
        }
    });

    scriptForAll += '--';
    final[`${commandObj.name}:all`] = scriptForAll;
});

const childScript = commandObjs.reduce((acc, curr) => {
    acc[curr.name] = curr.command;
    return acc;
}, {});

packageJson.scripts = final as any;
const absRootDir = path.resolve(rootConfig.rootDir, '../..');
const languagesDir = path.resolve(absRootDir, 'languages');
const node_modules_ProjectsDir = path.join(rootDir, 'node_modules', '@projects');

const languages = fs.readdirSync(languagesDir);
fs.mkdirSync(node_modules_ProjectsDir, { recursive: true });

await symlinkDir(rootDir, path.resolve(node_modules_ProjectsDir, rootProjName));



packageJson.imports = {} as any;

packageJson.imports["#root/*"] = "./*";

childs.forEach(async (child) => {
    const folderName = child.folderName;
    packageJson.imports[`#${folderName}/*`] = `./${child.relativeFolderPath}/*`
});


Object.keys(packageJson.dependencies).forEach(key => {
    if (key.startsWith('@projects/')) {
        delete packageJson.dependencies[key];
    }
});


const filesToJson = ['tsconfig.ts', '.eslintrc.ts', '.prettierrc.ts', '.stylelintrc.ts']

function processTsToJson(dir){
    filesToJson.forEach(fileToJson => {
        const absFilePath = path.join(dir, fileToJson);
        const dest = renameExtension(absFilePath, 'json');
        import(absFilePath).then(json => {
            const content = JSON.stringify(json);
            fs.writeFileSync(dest, content, 'utf8');
        })
    });
}
processTsToJson(rootDir);

childs.forEach(async (child) => {
    const childFolderPath = path.resolve(rootDir, `${child.relativeFolderPath}`);
    const folderName = child.folderName;
    const childPackageJson = child.packageJson;
    childPackageJson.name = folderName;
    childPackageJson.scripts = childScript as any;
    childPackageJson.dependencies = Object.assign({}, packageJson.dependencies);
    childPackageJson.devDependencies = packageJson.devDependencies as any;

    childPackageJson.imports = { [`#${child.folderName}/*`]: "./*" };
    childs.forEach(c => {
        if (child !== c) {
            childPackageJson.imports[`#${c.folderName}/*`] = `@projects/${rootProjName}/${c.relativeFolderPath}/*`;
        }
    })
    childPackageJson.imports[`#${rootProjName}/*`] = `@projects/${rootProjName}/*`

    const relToRoot = path.relative(child.absoluteFolderPath, rootDir)
    childPackageJson.dependencies[`@projects/${rootProjName}`] = normalizePath(relToRoot);

    fs.writeFileSync(path.resolve(childFolderPath, 'package.json'), JSON.stringify(childPackageJson, null, 4), 'utf8');

    await symlinkDir(path.resolve(rootDir, 'node_modules'), path.resolve(childFolderPath, 'node_modules'));
    processTsToJson(child.absoluteFolderPath);
});


fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 4), 'utf8');


