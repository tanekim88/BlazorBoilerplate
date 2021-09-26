import { Global, Inject, Injectable, Module, ModuleMetadata } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

export function processProviders(providers: any[]) {
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
        } else {
            return p;
        }
    });
}

export function processModuleOptions(options: ModuleMetadata) {
    const { providers, imports, exports } = options;
    const processedProviders = processProviders(providers);
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

function isClass(obj) {
    const isCtorClass = obj.constructor && obj.constructor.toString().substring(0, 5) === 'class';
    if (obj.prototype === undefined) {
        return isCtorClass;
    }
    const isPrototypeCtorClass =
        obj.prototype.constructor &&
        obj.prototype.constructor.toString &&
        obj.prototype.constructor.toString().substring(0, 5) === 'class';
    return isCtorClass || isPrototypeCtorClass;
}

export function CustomModule(metaData: ModuleMetadata) {
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

        Module(processModuleOptions(metaData))(target);
        Global()(target);

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

export function CustomInjectable(options?) {
    return (target) => {
        // const { Injectable } = require('@nestjs/common');
        Injectable(options)(target);

        // autoInjectable()(target);
    };
}
export function CustomInject(token): (target: any, key: string | symbol, index?: number) => void {
    return (target: any, key, index: number) => {
        Inject(token)(target, key, index);
        // inject(token)(target, key, index);
    };
}

export class CustumContainer {
    /**
     *
     */

    container;

    async init(module?) {
        const app = await NestFactory.create(module);
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
