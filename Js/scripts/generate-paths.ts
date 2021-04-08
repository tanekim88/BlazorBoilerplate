// class Apps {
//     SharedLibrary = new SharedLibrary();
//     BlazorApp = new BlazorApp();
//     IdentityServer = new IdentityServer();

//     toString = () => 'abc';
// }

// const a = new Apps();

// class SharedLibrary {}

// class BlazorApp {}

// class IdentityServer {}
import 'reflect-metadata';
import { rootConfig } from '@root/configs';
import path from 'path';
import fs from 'fs';


const rootDir = rootConfig.rootDir;

const blackListedFolders = ['bin', 'node_modules', 'obj', '.vs', 'dist', 'compiled', 'modules'];
const blackListedFiles = ['.map'];

const getAllFiles = function (
    dirPath,
    toReturn = {
        toAbsolutePath: dirPath,
        // toString: dirPath,
        // '[Symbol.toStringTag]': dirPath,
        toRelativePath: '',
    },
    toType = {
        toAbsolutePath: 'string',
        // toString: 'string',
        // '[Symbol.toStringTag]': 'string',
        toRelativePath: 'string',
    },
    topDir = null,
) {
    if (!topDir) {
        topDir = dirPath;
    }

    const files = fs.readdirSync(dirPath);

    files.forEach(function (file) {
        const typeKey = 'readonly ' + file;
        const fullPath = path.join(dirPath, file);

        if (!blackListedFiles.every((b) => file.endsWith(b))) {
            toReturn[file] = {
                toAbsolutePath: fullPath,
                // toString: fullPath,
                // '[Symbol.toStringTag]': fullPath,
                toRelativePath: path.relative(topDir, fullPath),
            };

            toType[typeKey] = {
                toAbsolutePath: 'string',
                // toString: 'string',
                // '[Symbol.toStringTag]': 'string',
                toRelativePath: 'string',
            };
        }

        if (blackListedFolders.every((b) => !file.endsWith(b))) {
            if (fs.statSync(fullPath).isDirectory()) {
                [toReturn[file], toType[typeKey]] = getAllFiles(fullPath, toReturn[file], toType[typeKey], topDir);
            }
        }
    });

    return [toReturn, toType];
};

const newRootPath = path.join(rootDir,'..');

const [toReturn, toType] = getAllFiles(newRootPath);

const createProxyScript = `
    function createProxy(obj) {
        return new Proxy(obj, {
            set: (target, prop, value) => {
                throw new Error('readonly');
            },
            
            get: (target, prop) => {
                if (target[prop] === undefined) {
                    throw new Error(\`prop \${prop.toString()} does not exists in \${target}\`);
                }
                
                return createProxy(target[prop]);
            },
        });
    }
    `;

const jsonType = JSON.stringify(toType, undefined, 4);
const type = jsonType
    // .replace(/"toString": "string"/g, 'toString:()=> string')
    // .replace(/"\[Symbol.toStringTag\]": "string"/g, '[Symbol.toStringTag]:()=> string')
    .replace(/"toAbsolutePath": "string"/g, 'toAbsolutePath:()=> string')
    .replace(/"toRelativePath": "string"/g, 'toRelativePath:()=> string')
    .replace(/"readonly /g, 'readonly "')
    // .replace(/\}/g, '} | string\n');
    .replace(/\}/g, '}\n');

const finalType = 'type RootPathsType = ' + type + '\n';

const json = JSON.stringify(toReturn, undefined, 4);
const content = json
    // .replace(/"toString":/g, 'toString:()=>')
    // .replace(/"\[Symbol.toStringTag\]":/g, '[Symbol.toStringTag]: ()=>')
    .replace(/"toAbsolutePath":/g, 'toAbsolutePath:()=>')
    .replace(/"toRelativePath":/g, 'toRelativePath:()=>');
const finalContent =
    `export const RootPaths:RootPathsType = createProxy( ` +
    content +
    `);\nexport const rootPaths = RootPaths.Js;`;

fs.writeFileSync('paths.ts', createProxyScript + finalType + finalContent);
