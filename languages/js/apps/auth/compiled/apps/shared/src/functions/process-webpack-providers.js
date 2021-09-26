"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustumContainer = exports.CustomInject = exports.CustomInjectable = exports.CustomModule = exports.processModuleOptions = exports.processWebpackProviders = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
function processWebpackProviders(providers) {
    const processedProviders = providers ?? [];
    return processedProviders.flatMap((p) => {
        const parentClass = Object.getPrototypeOf(p);
        if (isClass(p) && isClass(parentClass)) {
            return [
                p,
                {
                    provide: parentClass,
                    useClass: p,
                },
            ];
        }
        else {
            return p;
        }
    });
}
exports.processWebpackProviders = processWebpackProviders;
function processModuleOptions(options) {
    const { providers, imports, exports } = options;
    const processedProviders = processWebpackProviders(providers);
    const processsedImports = imports ?? [];
    let processsedExports = exports ?? [];
    processsedExports = [
        ...processsedExports,
        ...processsedImports,
        ...processedProviders.map((x) => {
            return x.provide ?? x;
        }),
    ];
    return Object.assign(options, {
        providers: processedProviders,
        exports: processsedExports,
    });
}
exports.processModuleOptions = processModuleOptions;
function isClass(obj) {
    const isCtorClass = obj.constructor && obj.constructor.toString().substring(0, 5) === 'class';
    if (obj.prototype === undefined) {
        return isCtorClass;
    }
    const isPrototypeCtorClass = obj.prototype.constructor &&
        obj.prototype.constructor.toString &&
        obj.prototype.constructor.toString().substring(0, 5) === 'class';
    return isCtorClass || isPrototypeCtorClass;
}
function CustomModule(metaData) {
    return (target) => {
        // metaData?.providers?.forEach((p) => {
        //     autoInjectable()(target);
        // });
        // const { Global, Module } = require('@nestjs/common');
        if (!metaData?.exports) {
            metaData.exports = [];
        }
        if (!metaData?.imports) {
            metaData.imports = [];
        }
        if (!metaData?.providers) {
            metaData.providers = [];
        }
        const importsFromOthers = Reflect.getMetadata('imports', target) ?? [];
        const f = (obj) => obj['name'] ?? obj;
        // importsFromOthers.forEach((imported) => {
        //     const importsFromOthers = Reflect.getMetadata('imports', imported) ?? [];
        //     const exportsFromOthers = Reflect.getMetadata('exports', imported) ?? [];
        //     const providersFromOthers = Reflect.getMetadata('providers', imported) ?? [];
        //     metaData.exports = _.uniqBy(exportsFromOthers.concat(metaData.exports), f);
        //     metaData.imports = _.uniqBy(importsFromOthers.concat(metaData.imports), f);
        //     metaData.providers = _.uniqBy(providersFromOthers.concat(metaData.providers), f);
        // });
        common_1.Module(processModuleOptions(metaData))(target);
        common_1.Global()(target);
        // const exportsFromOthers2 = Reflect.getMetadata('exports', target) ?? [];
        // const importsFromOthers2 = Reflect.getMetadata('imports', target) ?? [];
        // const providersFromOthers2 = Reflect.getMetadata('providers', target) ?? [];
        // console.log('TTTTTTTTTTTTTTTTTTTTTTTT');
        // console.log(target.name);
        // console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
        // console.dir(exportsFromOthers2);
        // console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
        // console.dir(importsFromOthers2);
        // console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
        // console.dir(providersFromOthers2);
    };
}
exports.CustomModule = CustomModule;
function CustomInjectable(options) {
    return (target) => {
        // const { Injectable } = require('@nestjs/common');
        common_1.Injectable(options)(target);
        // autoInjectable()(target);
    };
}
exports.CustomInjectable = CustomInjectable;
function CustomInject(token) {
    return (target, key, index) => {
        common_1.Inject(token)(target, key, index);
        // inject(token)(target, key, index);
    };
}
exports.CustomInject = CustomInject;
class CustumContainer {
    async init(module) {
        const app = await core_1.NestFactory.create(module);
        await app.init();
        this.container = app;
        return this;
    }
    get(obj) {
        if (this.container) {
            return this.container.get(obj);
        }
        return new obj();
    }
}
exports.CustumContainer = CustumContainer;
//# sourceMappingURL=process-webpack-providers.js.map