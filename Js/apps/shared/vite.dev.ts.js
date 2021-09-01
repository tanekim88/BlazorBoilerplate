var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/vite/vite-base/vite-base.service.ts
import vite from "vite";

// src/modules/environment/environment/environment.service.ts
import path2 from "path";

// configs.base.ts
var ConfigBase = class {
  rootDir;
  RootDir;
  projectName;
  name;
  title;
  shortName;
  developerName;
  developerUrl;
  description;
};

// configs.ts
import { rootConfig } from "#root/configs";
import { blazorAppConfig } from "#blazor-app/configs";
import { authConfig } from "#auth/configs";
import path from "path";

// paths.ts
import { rootPaths } from "#root/paths";
var sharedPaths = rootPaths.apps.shared;

// configs.ts
var LOCAL_CONFIG = Symbol("LOCAL_CONFIG");
var SharedConfig = class extends ConfigBase {
  rootDir = sharedPaths.toAbsolutePath();
  RootDir = sharedPaths.toAbsolutePath();
  projectName = path.basename("C:\\App\\Js\\apps\\shared");
  name = "Shared Library";
  title = "App title";
  shortName = "App short name";
  developerName = "Tane Kim";
  developerUrl = "www.taneware.com";
  description = "app desc";
  dependentProjects = [];
};
var sharedConfig = new SharedConfig();
var Configs = class {
  allConfigs = [rootConfig, sharedConfig, blazorAppConfig, authConfig];
  get allRootDirs() {
    return this.allConfigs.map((config) => config.rootDir);
  }
};
var configs = new Configs();

// src/modules/utilities/merge/merge/merge.service.ts
import { CustomInjectable } from "#shared/src/functions/process-providers";
import _2 from "lodash";

// src/modules/utilities/merge/merge/merge-command-option.ts
var _MergeCommandOption = class {
};
var MergeCommandOption = _MergeCommandOption;
__publicField(MergeCommandOption, "token", {});
__publicField(MergeCommandOption, "append", { name: "append", token: _MergeCommandOption.token });
__publicField(MergeCommandOption, "prepend", { name: "prepend", token: _MergeCommandOption.token });
__publicField(MergeCommandOption, "overwrite", { name: "overwrite", token: _MergeCommandOption.token });
__publicField(MergeCommandOption, "overwriteCommandsOnly", { name: "overwriteCommandsOnly", token: _MergeCommandOption.token });
__publicField(MergeCommandOption, "getOverwritten", { name: "getOverwritten", token: _MergeCommandOption.token });
__publicField(MergeCommandOption, "deleteLastOne", { name: "deleteLastOne", token: _MergeCommandOption.token });
__publicField(MergeCommandOption, "deleteFirstOne", { name: "deleteFirstOne", token: _MergeCommandOption.token });
__publicField(MergeCommandOption, "deleteFirstN", { name: "deleteFirstN", token: _MergeCommandOption.token });
__publicField(MergeCommandOption, "deleteLastN", { name: "deleteLastN", token: _MergeCommandOption.token });
__publicField(MergeCommandOption, "makeThemUnique", { name: "makeThemUnique", token: _MergeCommandOption.token });
__publicField(MergeCommandOption, "customMerge", { name: "customMerge", token: _MergeCommandOption.token });

// src/modules/utilities/merge/merge/merge-with-customizer.ts
import _ from "lodash";
function mergeCustomizer(mergeDefault = MergeCommandOption.append) {
  return (objValue, srcValue, key, object, source, stack) => {
    if (_.isNil(objValue)) {
      return srcValue;
    }
    if (_.isObject(objValue) && _.isObject(srcValue)) {
      if (_.isArray(objValue) && !_.isArray(srcValue) || !_.isArray(objValue) && _.isArray(srcValue)) {
        throw new Error("Property type mismatch.");
      }
    }
    if (typeof srcValue === "string") {
      return srcValue;
    }
    if (_.isArray(objValue)) {
      if (objValue.length > 0) {
        let toReturn = [];
        objValue.forEach((s) => {
          if (s[0]?.token !== MergeCommandOption.token) {
            s = [mergeDefault, [s]];
          }
          const command = s[0];
          switch (command) {
            case MergeCommandOption.prepend:
              toReturn = [].concat(s[1]).concat(toReturn);
              break;
            case MergeCommandOption.overwrite:
              toReturn = [];
              toReturn = toReturn.concat(s[1]);
              break;
            case MergeCommandOption.overwriteCommandsOnly:
              toReturn = toReturn.filter((t) => t[0]?.token !== MergeCommandOption.token);
              toReturn = toReturn.concat(s[1]);
              break;
            case MergeCommandOption.getOverwritten:
              break;
            case MergeCommandOption.append:
              toReturn = toReturn.concat(s[1]);
              break;
            case MergeCommandOption.deleteFirstOne:
              toReturn.shift();
              break;
            case MergeCommandOption.deleteFirstN:
              toReturn.splice(0, s[1][0]);
              break;
            case MergeCommandOption.deleteLastOne:
              toReturn.pop();
              break;
            case MergeCommandOption.deleteLastN:
              toReturn.splice(toReturn.length - s[1][0]);
              break;
            case MergeCommandOption.makeThemUnique:
              toReturn = _.uniq(toReturn);
              break;
            case MergeCommandOption.customMerge:
              toReturn = s[1][0](toReturn);
              break;
            default:
              toReturn.push(s[1][0]);
              break;
          }
        });
        objValue = toReturn;
      }
      if (_.isArray(srcValue) && srcValue.length > 0) {
        let toReturn = objValue;
        srcValue.forEach((s) => {
          if (s[0]?.token !== MergeCommandOption.token) {
            s = [mergeDefault, s];
          }
          const command = s[0];
          switch (command) {
            case MergeCommandOption.prepend:
              toReturn = [].concat(s[1]).concat(toReturn);
              break;
            case MergeCommandOption.overwrite:
              toReturn = [];
              toReturn = toReturn.concat(s[1]);
              break;
            case MergeCommandOption.overwriteCommandsOnly:
              toReturn = toReturn.filter((t) => t[0]?.token !== MergeCommandOption.token);
              toReturn = toReturn.concat(s[1]);
              break;
            case MergeCommandOption.getOverwritten:
              break;
            case MergeCommandOption.append:
              toReturn = toReturn.concat(s[1]);
              break;
            case MergeCommandOption.deleteFirstOne:
              toReturn.shift();
              break;
            case MergeCommandOption.deleteFirstN:
              toReturn.splice(0, s[1][0]);
              break;
            case MergeCommandOption.deleteLastOne:
              toReturn.pop();
              break;
            case MergeCommandOption.deleteLastN:
              toReturn.splice(toReturn.length - s[1][0]);
              break;
            case MergeCommandOption.makeThemUnique:
              toReturn = _.uniq(toReturn);
              break;
            case MergeCommandOption.customMerge:
              toReturn = s[1][0](toReturn);
              break;
            default:
              toReturn.push(s[1][0]);
              break;
          }
        });
        return toReturn;
      }
    }
  };
}

// src/modules/utilities/merge/merge/merge.service.ts
var MergeService = class {
  mergeOptions(...objs) {
    if (Array.isArray(objs[0])) {
      return objs.reduce((acc, curr) => {
        return _2.mergeWith(acc, curr, mergeCustomizer());
      }, []);
    }
    return objs.reduce((acc, curr) => {
      return _2.mergeWith(acc, curr, mergeCustomizer());
    }, {});
  }
  smartlyMergeOptions(obj1, obj2) {
    const toMerge = [obj1, obj2].flat(Infinity);
    return this.mergeOptions(...toMerge);
  }
};
MergeService = __decorateClass([
  CustomInjectable()
], MergeService);

// src/modules/environment/environment/environment.service.ts
import { CustomInject, CustomInjectable as CustomInjectable2 } from "#shared/src/functions/process-providers";
import { RootPaths, rootPaths as rootPaths2 } from "#root/paths";
var EnvironmentService = class {
  localConfig;
  mergeService;
  isProduction;
  isDevelopment;
  localPaths;
  LocalPaths;
  outputDir;
  logoPath;
  onModuleInit() {
    const relPath = path2.relative(rootPaths2.toAbsolutePath(), this.localConfig.rootDir);
    const splitted = relPath.split(path2.sep);
    this.localPaths = splitted.reduce((acc, curr) => {
      acc = acc[curr];
      return acc;
    }, rootPaths2);
    const RelPath = path2.relative(RootPaths.toAbsolutePath(), this.localConfig.RootDir);
    const Splitted = RelPath.split(path2.sep);
    this.LocalPaths = Splitted.reduce((acc, curr) => {
      acc = acc[curr];
      return acc;
    }, RootPaths);
    this.createEnvironments();
  }
  createEnvironments() {
    this.isProduction = process.env.NODE_ENV === "production";
    this.isDevelopment = process.env.NODE_ENV === "development";
    if (this.LocalPaths["wwwroot"]) {
      this.outputDir = this.LocalPaths["wwwroot"].toAbsolutePath();
    }
    this.logoPath = this.localPaths.src.logo["icon-512.png"].toAbsolutePath();
  }
};
__decorateClass([
  CustomInject(LOCAL_CONFIG)
], EnvironmentService.prototype, "localConfig", 2);
__decorateClass([
  CustomInject(MergeService)
], EnvironmentService.prototype, "mergeService", 2);
EnvironmentService = __decorateClass([
  CustomInjectable2()
], EnvironmentService);

// src/vite/vite-base/vite-base.service.ts
import { CustomInjectable as CustomInjectable6 } from "#shared/src/functions/process-providers";
import { CustomInject as CustomInject4 } from "#shared/src/functions/process-providers";

// src/vite/vite-plugins/vite-plugins/vite-plugins.service.ts
import { CustomInject as CustomInject3, CustomInjectable as CustomInjectable5 } from "#shared/src/functions/process-providers";

// src/vite/vite-plugins/vite-plugin-glob-input/vite-plugin-glob-input.service.ts
import { CustomInjectable as CustomInjectable4 } from "#shared/src/functions/process-providers";
import path3 from "path";

// src/vite/vite-plugins/vite-plugin-base/vite-plugin-base.service.ts
import { CustomInject as CustomInject2, CustomInjectable as CustomInjectable3 } from "#shared/src/functions/process-providers";
var VitePluginBaseService = class {
  mergeService;
  environmentService;
  createPlugin(...options) {
    return {};
  }
};
__decorateClass([
  CustomInject2(MergeService)
], VitePluginBaseService.prototype, "mergeService", 2);
__decorateClass([
  CustomInject2(EnvironmentService)
], VitePluginBaseService.prototype, "environmentService", 2);
VitePluginBaseService = __decorateClass([
  CustomInjectable3()
], VitePluginBaseService);

// src/vite/vite-plugins/vite-plugin-glob-input/vite-plugin-glob-input.service.ts
import sanitizeFilename from "sanitize-filename";
import isString from "lodash/isString";
import partition from "lodash/partition";
import fastGlob from "fast-glob";
var defaultOptions = {
  relative: `src${path3.sep}`
};
var outputFileName = (filePath) => {
  const chunkId = sanitizeFilename(filePath, { replacement: "_" });
  return chunkId;
};
var VitePluginGlobInputService = class extends VitePluginBaseService {
  createPlugin(options = defaultOptions) {
    const {
      glob: globOptions,
      relative = defaultOptions.relative,
      transformOutputPath
    } = options;
    return {
      name: "vite-plugin-glob-input",
      options(conf) {
        const [globs, others] = partition([conf.input].flat(), isString);
        const normalizedGlobs = globs.map((glob) => glob.replace(/\\/g, "/"));
        const input = Object.assign({}, Object.fromEntries(fastGlob.sync(normalizedGlobs, globOptions).map((entry) => {
          const filePath = path3.relative(relative, entry.name);
          const isRelative = !filePath.startsWith(`..${path3.sep}`);
          const relativeFilePath = isRelative ? filePath : path3.relative(`.${path3.sep}`, entry.name);
          if (transformOutputPath) {
            return [outputFileName(transformOutputPath(relativeFilePath, entry.name)), entry.name];
          }
          return [outputFileName(relativeFilePath), entry.name];
        })), ...others);
        return {
          ...conf,
          input
        };
      }
    };
  }
};
VitePluginGlobInputService = __decorateClass([
  CustomInjectable4()
], VitePluginGlobInputService);

// src/vite/vite-plugins/vite-plugins/vite-plugins.service.ts
var VitePluginsService = class {
  environmentService;
  vitePluginGlobInputService;
  createManyPlugins() {
    let plugins = [];
    plugins.push(this.vitePluginGlobInputService.createPlugin());
    return plugins;
  }
};
__decorateClass([
  CustomInject3(EnvironmentService)
], VitePluginsService.prototype, "environmentService", 2);
__decorateClass([
  CustomInject3(VitePluginGlobInputService)
], VitePluginsService.prototype, "vitePluginGlobInputService", 2);
VitePluginsService = __decorateClass([
  CustomInjectable5()
], VitePluginsService);

// src/vite/vite-base/vite-base.service.ts
var ViteBaseService = class {
  mergeService;
  environmentService;
  vitePluginsService;
  createConfiguration(options) {
    const plugins = this.vitePluginsService.createManyPlugins();
    return this.mergeService.mergeOptions({
      build: {
        rollupOptions: {},
        watch: {},
        assetsInlineLimit: 4096,
        cssCodeSplit: true,
        sourcemap: false
      },
      css: {
        preprocessorOptions: {
          scss: {}
        },
        postcss: {}
      },
      optimizeDeps: {
        include: [],
        exclude: [],
        keepNames: false
      },
      plugins,
      resolve: {}
    }, options);
  }
  async parseConfigFromFile(configEnv, configFile) {
    const configObj = await vite.loadConfigFromFile(configEnv, configFile);
    const config = configObj.config;
    return config;
  }
  build(userConfig) {
    vite.build(userConfig);
  }
  watch(userConfig) {
    vite.createServer(userConfig);
  }
};
__decorateClass([
  CustomInject4(MergeService)
], ViteBaseService.prototype, "mergeService", 2);
__decorateClass([
  CustomInject4(EnvironmentService)
], ViteBaseService.prototype, "environmentService", 2);
__decorateClass([
  CustomInject4(VitePluginsService)
], ViteBaseService.prototype, "vitePluginsService", 2);
ViteBaseService = __decorateClass([
  CustomInjectable6()
], ViteBaseService);

// src/vite/vite-dev/vite-dev.service.ts
import { CustomInject as CustomInject5, CustomInjectable as CustomInjectable8 } from "#shared/src/functions/process-providers";

// src/vite/vite-shared/vite-shared.service.ts
import { CustomInjectable as CustomInjectable7 } from "#shared/src/functions/process-providers";
var ViteSharedService = class extends ViteBaseService {
  createConfiguration(options) {
    return this.mergeService.mergeOptions(super.createConfiguration(), {
      plugins: [],
      resolve: {
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
      },
      css: {
        preprocessorOptions: {
          scss: {}
        }
      },
      json: {
        namedExports: true,
        stringify: false
      },
      esbuild: {}
    }, options);
  }
};
ViteSharedService = __decorateClass([
  CustomInjectable7()
], ViteSharedService);

// src/vite/vite-dev/vite-dev.service.ts
var ViteDevService = class extends ViteBaseService {
  viteSharedService;
  createConfiguration(options) {
    return this.mergeService.mergeOptions(super.createConfiguration(), this.viteSharedService.createConfiguration(), {
      mode: "development",
      build: {
        minify: false
      }
    }, options);
  }
  createManyConfigurations() {
    return [];
  }
};
__decorateClass([
  CustomInject5(ViteSharedService)
], ViteDevService.prototype, "viteSharedService", 2);
ViteDevService = __decorateClass([
  CustomInjectable8()
], ViteDevService);

// src/functions/process-providers.ts
import { Global, Inject, Injectable, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
function processProviders(providers) {
  const processedProviders = providers ?? [];
  return processedProviders.flatMap((p) => {
    const parentClass = Object.getPrototypeOf(p);
    if (isClass(p) && isClass(parentClass)) {
      return [
        p,
        {
          provide: parentClass,
          useClass: p
        }
      ];
    } else {
      return p;
    }
  });
}
function processModuleOptions(options) {
  const { providers, imports, exports } = options;
  const processedProviders = processProviders(providers);
  const processsedImports = imports ?? [];
  let processsedExports = exports ?? [];
  processsedExports = [
    ...processsedExports,
    ...processsedImports,
    ...processedProviders.map((x) => {
      return x.provide ?? x;
    })
  ];
  return Object.assign(options, {
    providers: processedProviders,
    exports: processsedExports
  });
}
function isClass(obj) {
  const isCtorClass = obj.constructor && obj.constructor.toString().substring(0, 5) === "class";
  if (obj.prototype === void 0) {
    return isCtorClass;
  }
  const isPrototypeCtorClass = obj.prototype.constructor && obj.prototype.constructor.toString && obj.prototype.constructor.toString().substring(0, 5) === "class";
  return isCtorClass || isPrototypeCtorClass;
}
function CustomModule(metaData) {
  return (target) => {
    if (!metaData?.exports) {
      metaData.exports = [];
    }
    if (!metaData?.imports) {
      metaData.imports = [];
    }
    if (!metaData?.providers) {
      metaData.providers = [];
    }
    const importsFromOthers = Reflect.getMetadata("imports", target) ?? [];
    const f = (obj) => obj["name"] ?? obj;
    Module(processModuleOptions(metaData))(target);
    Global()(target);
  };
}

// src/modules/utilities/merge/merge.module.ts
var MergeModule = class {
};
MergeModule = __decorateClass([
  CustomModule({
    providers: [MergeService]
  })
], MergeModule);

// src/modules/utilities/regex/regex/regex.service.ts
import _3 from "lodash";
import { CustomInjectable as CustomInjectable9 } from "#shared/src/functions/process-providers";
var RegexService = class {
  escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  }
  escapeRegExpIfStr(arg) {
    if (arg instanceof RegExp) {
      return arg;
    }
    return this.escapeRegExp(arg);
  }
  generateRegex(options) {
    let toReturn = "";
    const toContain = [];
    if (!_3.isEmpty(options.startsWithTheseWords)) {
      toContain.push(`(${options.startsWithTheseWords.map(this.escapeRegExpIfStr.bind(this)).map((x) => x).join("|")})`);
      toReturn += "^";
    }
    if (!_3.isEmpty(options.containsTheseWords)) {
      toContain.push(`.*(${options.containsTheseWords.map(this.escapeRegExpIfStr.bind(this)).map((x) => x).join("|")})`);
    }
    if (!_3.isEmpty(options.endsWithTheseWords)) {
      toContain.push(`.*(${options.endsWithTheseWords.map(this.escapeRegExpIfStr.bind(this)).map((x) => x + "$").join("|")})`);
    }
    if (!_3.isEmpty(toContain)) {
      toReturn += /(?=A)/.source.replace("A", toContain.join(""));
    }
    const notToContain = [];
    if (!_3.isEmpty(options.doesNotStartWithTheseWords)) {
      notToContain.push(`(${options.doesNotStartWithTheseWords.map(this.escapeRegExpIfStr.bind(this)).map((x) => x).join("|")})`);
      toReturn += "^";
    }
    if (!_3.isEmpty(options.doesNotContainTheseWords)) {
      notToContain.push(`.*(${options.doesNotContainTheseWords.map(this.escapeRegExpIfStr.bind(this)).map((x) => x).join("|")})`);
    }
    if (!_3.isEmpty(options.doesNotEndsWithTheseWords)) {
      notToContain.push(`.*(${options.doesNotEndsWithTheseWords.map(this.escapeRegExpIfStr.bind(this)).map((x) => x + "$").join("|")})`);
    }
    if (!_3.isEmpty(notToContain)) {
      toReturn += /(?!A)/.source.replace("A", notToContain.join("|"));
    }
    let flags = "";
    if (options.caseInsensitive) {
      flags += "i";
    }
    return new RegExp(toReturn, flags);
  }
};
RegexService = __decorateClass([
  CustomInjectable9()
], RegexService);

// src/modules/utilities/regex/regex.module.ts
var RegexModule = class {
};
RegexModule = __decorateClass([
  CustomModule({
    providers: [RegexService]
  })
], RegexModule);

// src/modules/utilities/utilities.module.ts
var UtilitiesModule = class {
};
UtilitiesModule = __decorateClass([
  CustomModule({
    imports: [MergeModule, RegexModule],
    providers: []
  })
], UtilitiesModule);

// src/modules/environment/environment.module.ts
var EnvironmentModule = class {
};
EnvironmentModule = __decorateClass([
  CustomModule({
    providers: [
      EnvironmentService
    ],
    imports: []
  })
], EnvironmentModule);

// src/modules/postcss/postcss.module.ts
import { Module as Module2 } from "@nestjs/common";
var PostcssModule = class {
};
PostcssModule = __decorateClass([
  Module2({})
], PostcssModule);

// src/modules/modules.module.ts
var ModulesModule = class {
};
ModulesModule = __decorateClass([
  CustomModule({
    imports: [UtilitiesModule, EnvironmentModule, PostcssModule],
    providers: []
  })
], ModulesModule);

// src/vite/vite-prod/vite-prod.service.ts
import { CustomInject as CustomInject6, CustomInjectable as CustomInjectable10 } from "#shared/src/functions/process-providers";
var ViteProdService = class extends ViteBaseService {
  viteSharedService;
  createConfiguration(options) {
    return this.mergeService.mergeOptions(super.createConfiguration(), this.viteSharedService.createConfiguration(), {
      mode: "production"
    }, options);
  }
  createManyConfigurations() {
    return [];
  }
};
__decorateClass([
  CustomInject6(ViteSharedService)
], ViteProdService.prototype, "viteSharedService", 2);
ViteProdService = __decorateClass([
  CustomInjectable10()
], ViteProdService);

// src/vite/vite.module.ts
var ViteModule = class {
};
ViteModule = __decorateClass([
  CustomModule({
    imports: [ModulesModule],
    providers: [
      ViteProdService,
      ViteDevService,
      ViteSharedService,
      ViteBaseService,
      VitePluginsService
    ]
  })
], ViteModule);

// vite.base.ts
import { NestFactory as NestFactory2 } from "@nestjs/core";
var ViteBase = class {
  constructor(viteModule, services) {
    this.viteModule = viteModule;
    this.services = services;
    this.createViteConfigs = this.createViteConfigs.bind(this);
    this.build = this.build.bind(this);
    this.watch = this.watch.bind(this);
  }
  async createViteConfigs(env, options) {
    if (options?.mode) {
      process.env.NODE_ENV = options?.mode;
    }
    const app = await NestFactory2.create(this.viteModule);
    await app.init();
    return this.services.map((service) => {
      const svc = app.get(service);
      const config = svc.createConfiguration();
      return config;
    });
  }
  build() {
    if (process.env.NODE_ENV) {
      (async () => {
        const configs2 = await this.createViteConfigs();
      })();
    }
  }
  watch() {
    if (process.env.NODE_ENV) {
      (async () => {
        const configs2 = await this.createViteConfigs();
      })();
    }
  }
};

// vite.dev.ts
var viteBase = new ViteBase(ViteModule, [ViteDevService]);
viteBase.build();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL3ZpdGUvdml0ZS1iYXNlL3ZpdGUtYmFzZS5zZXJ2aWNlLnRzIiwgInNyYy9tb2R1bGVzL2Vudmlyb25tZW50L2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UudHMiLCAiY29uZmlncy5iYXNlLnRzIiwgImNvbmZpZ3MudHMiLCAicGF0aHMudHMiLCAic3JjL21vZHVsZXMvdXRpbGl0aWVzL21lcmdlL21lcmdlL21lcmdlLnNlcnZpY2UudHMiLCAic3JjL21vZHVsZXMvdXRpbGl0aWVzL21lcmdlL21lcmdlL21lcmdlLWNvbW1hbmQtb3B0aW9uLnRzIiwgInNyYy9tb2R1bGVzL3V0aWxpdGllcy9tZXJnZS9tZXJnZS9tZXJnZS13aXRoLWN1c3RvbWl6ZXIudHMiLCAic3JjL3ZpdGUvdml0ZS1wbHVnaW5zL3ZpdGUtcGx1Z2lucy92aXRlLXBsdWdpbnMuc2VydmljZS50cyIsICJzcmMvdml0ZS92aXRlLXBsdWdpbnMvdml0ZS1wbHVnaW4tZ2xvYi1pbnB1dC92aXRlLXBsdWdpbi1nbG9iLWlucHV0LnNlcnZpY2UudHMiLCAic3JjL3ZpdGUvdml0ZS1wbHVnaW5zL3ZpdGUtcGx1Z2luLWJhc2Uvdml0ZS1wbHVnaW4tYmFzZS5zZXJ2aWNlLnRzIiwgInNyYy92aXRlL3ZpdGUtZGV2L3ZpdGUtZGV2LnNlcnZpY2UudHMiLCAic3JjL3ZpdGUvdml0ZS1zaGFyZWQvdml0ZS1zaGFyZWQuc2VydmljZS50cyIsICJzcmMvZnVuY3Rpb25zL3Byb2Nlc3MtcHJvdmlkZXJzLnRzIiwgInNyYy9tb2R1bGVzL3V0aWxpdGllcy9tZXJnZS9tZXJnZS5tb2R1bGUudHMiLCAic3JjL21vZHVsZXMvdXRpbGl0aWVzL3JlZ2V4L3JlZ2V4L3JlZ2V4LnNlcnZpY2UudHMiLCAic3JjL21vZHVsZXMvdXRpbGl0aWVzL3JlZ2V4L3JlZ2V4Lm1vZHVsZS50cyIsICJzcmMvbW9kdWxlcy91dGlsaXRpZXMvdXRpbGl0aWVzLm1vZHVsZS50cyIsICJzcmMvbW9kdWxlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5tb2R1bGUudHMiLCAic3JjL21vZHVsZXMvcG9zdGNzcy9wb3N0Y3NzLm1vZHVsZS50cyIsICJzcmMvbW9kdWxlcy9tb2R1bGVzLm1vZHVsZS50cyIsICJzcmMvdml0ZS92aXRlLXByb2Qvdml0ZS1wcm9kLnNlcnZpY2UudHMiLCAic3JjL3ZpdGUvdml0ZS5tb2R1bGUudHMiLCAidml0ZS5iYXNlLnRzIiwgInZpdGUuZGV2LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdml0ZSwgeyBDb25maWdFbnYsIFVzZXJDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWVyZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy91dGlsaXRpZXMvbWVyZ2UvbWVyZ2UvbWVyZ2Uuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBDdXN0b21JbmplY3RhYmxlIH0gZnJvbSAnI3NoYXJlZC9zcmMvZnVuY3Rpb25zL3Byb2Nlc3MtcHJvdmlkZXJzJztcclxuaW1wb3J0IHsgQ3VzdG9tSW5qZWN0IH0gZnJvbSAnI3NoYXJlZC9zcmMvZnVuY3Rpb25zL3Byb2Nlc3MtcHJvdmlkZXJzJztcclxuaW1wb3J0IHsgVml0ZVBsdWdpbnNTZXJ2aWNlIH0gZnJvbSAnLi4vdml0ZS1wbHVnaW5zL3ZpdGUtcGx1Z2lucy92aXRlLXBsdWdpbnMuc2VydmljZSc7XHJcblxyXG5AQ3VzdG9tSW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXRlQmFzZVNlcnZpY2Uge1xyXG4gIEBDdXN0b21JbmplY3QoTWVyZ2VTZXJ2aWNlKVxyXG4gIHByb3RlY3RlZCBtZXJnZVNlcnZpY2U6IE1lcmdlU2VydmljZTtcclxuXHJcbiAgQEN1c3RvbUluamVjdChFbnZpcm9ubWVudFNlcnZpY2UpXHJcbiAgcHJvdGVjdGVkIGVudmlyb25tZW50U2VydmljZTogRW52aXJvbm1lbnRTZXJ2aWNlO1xyXG5cclxuICBAQ3VzdG9tSW5qZWN0KFZpdGVQbHVnaW5zU2VydmljZSlcclxuICBwcm90ZWN0ZWQgdml0ZVBsdWdpbnNTZXJ2aWNlOiBWaXRlUGx1Z2luc1NlcnZpY2U7XHJcblxyXG4gIGNyZWF0ZUNvbmZpZ3VyYXRpb24ob3B0aW9ucz86IFVzZXJDb25maWcpIHtcclxuICAgIGNvbnN0IHBsdWdpbnMgPSB0aGlzLnZpdGVQbHVnaW5zU2VydmljZS5jcmVhdGVNYW55UGx1Z2lucygpO1xyXG4gICAgcmV0dXJuIHRoaXMubWVyZ2VTZXJ2aWNlLm1lcmdlT3B0aW9ucyh7XHJcbiAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHdhdGNoOiB7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXNzZXRzSW5saW5lTGltaXQ6IDQwOTYsXHJcbiAgICAgICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgICAgIHNvdXJjZW1hcDogZmFsc2VcclxuICAgICAgfSxcclxuICAgICAgY3NzOiB7XHJcbiAgICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgICAvLyBhZGRpdGlvbmFsRGF0YTpgJGluamVjdGVkQ29sb3I6IG9yYW5nZTtgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwb3N0Y3NzOiB7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgICAgaW5jbHVkZTogW10sXHJcbiAgICAgICAgZXhjbHVkZTogW10sXHJcbiAgICAgICAga2VlcE5hbWVzOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBwbHVnaW5zLFxyXG4gICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgLy8gYWxpYXM6W3tcclxuICAgICAgICAvLyAgIGZpbmQ6J0BibGF6b3JBcHAnLFxyXG4gICAgICAgIC8vICAgcmVwbGFjZW1lbnQ6Jy4vYmxhem9yQXBwJ1xyXG4gICAgICAgIC8vIH1dXHJcbiAgICAgIH1cclxuICAgIH0gYXMgVXNlckNvbmZpZywgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBwYXJzZUNvbmZpZ0Zyb21GaWxlKGNvbmZpZ0Vudj86IENvbmZpZ0VudiwgY29uZmlnRmlsZT86IHN0cmluZykge1xyXG4gICAgY29uc3QgY29uZmlnT2JqID0gYXdhaXQgdml0ZS5sb2FkQ29uZmlnRnJvbUZpbGUoY29uZmlnRW52LCBjb25maWdGaWxlKVxyXG4gICAgY29uc3QgY29uZmlnID0gY29uZmlnT2JqLmNvbmZpZztcclxuICAgIHJldHVybiBjb25maWc7XHJcbiAgfVxyXG5cclxuICBidWlsZCh1c2VyQ29uZmlnPzogVXNlckNvbmZpZykge1xyXG4gICAgdml0ZS5idWlsZCh1c2VyQ29uZmlnKTtcclxuICB9XHJcblxyXG4gIHdhdGNoKHVzZXJDb25maWc/OiBVc2VyQ29uZmlnKSB7XHJcbiAgICB2aXRlLmNyZWF0ZVNlcnZlcih1c2VyQ29uZmlnKTtcclxuICB9XHJcbn1cclxuIiwgImltcG9ydCB7IE9uTW9kdWxlSW5pdCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IExPQ0FMX0NPTkZJRyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbmZpZ3MnO1xyXG5pbXBvcnQgeyBNZXJnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlsaXRpZXMvbWVyZ2UvbWVyZ2UvbWVyZ2Uuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBDdXN0b21JbmplY3QsIEN1c3RvbUluamVjdGFibGUgfSBmcm9tICcjc2hhcmVkL3NyYy9mdW5jdGlvbnMvcHJvY2Vzcy1wcm92aWRlcnMnO1xyXG5pbXBvcnQgeyBDb25maWdCYXNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29uZmlncy5iYXNlJztcclxuaW1wb3J0IHsgUm9vdFBhdGhzLCByb290UGF0aHMgfSBmcm9tICcjcm9vdC9wYXRocyc7XHJcbmltcG9ydCB7IHNoYXJlZFBhdGhzIH0gZnJvbSAnI3NoYXJlZC9wYXRocyc7XHJcblxyXG50eXBlIExvY2FsUGF0aHNUeXBlID0gdHlwZW9mIHNoYXJlZFBhdGhzO1xyXG5cclxuQEN1c3RvbUluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRTZXJ2aWNlIGltcGxlbWVudHMgT25Nb2R1bGVJbml0IHtcclxuXHJcbiAgICBAQ3VzdG9tSW5qZWN0KExPQ0FMX0NPTkZJRylcclxuICAgIHB1YmxpYyBsb2NhbENvbmZpZzogQ29uZmlnQmFzZTtcclxuXHJcbiAgICBAQ3VzdG9tSW5qZWN0KE1lcmdlU2VydmljZSlcclxuICAgIHByb3RlY3RlZCBtZXJnZVNlcnZpY2U6IE1lcmdlU2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgaXNQcm9kdWN0aW9uOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBpc0RldmVsb3BtZW50OiBib29sZWFuO1xyXG5cclxuICAgIGxvY2FsUGF0aHM6IExvY2FsUGF0aHNUeXBlO1xyXG4gICAgXHJcbiAgICBMb2NhbFBhdGhzOiBMb2NhbFBhdGhzVHlwZTtcclxuXHJcbiAgICBvdXRwdXREaXI6IHN0cmluZztcclxuXHJcbiAgICBsb2dvUGF0aDogc3RyaW5nO1xyXG5cclxuICAgIG9uTW9kdWxlSW5pdCgpIHtcclxuICAgICAgICBjb25zdCByZWxQYXRoID0gcGF0aC5yZWxhdGl2ZShyb290UGF0aHMudG9BYnNvbHV0ZVBhdGgoKSwgdGhpcy5sb2NhbENvbmZpZy5yb290RGlyKTtcclxuICAgICAgICBjb25zdCBzcGxpdHRlZCA9IHJlbFBhdGguc3BsaXQocGF0aC5zZXApO1xyXG5cclxuICAgICAgICB0aGlzLmxvY2FsUGF0aHMgPSBzcGxpdHRlZC5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xyXG4gICAgICAgICAgICBhY2MgPSBhY2NbY3Vycl07XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwgcm9vdFBhdGhzIGFzIGFueSk7XHJcblxyXG4gICAgICAgIGNvbnN0IFJlbFBhdGggPSBwYXRoLnJlbGF0aXZlKFJvb3RQYXRocy50b0Fic29sdXRlUGF0aCgpLCB0aGlzLmxvY2FsQ29uZmlnLlJvb3REaXIpO1xyXG4gICAgICAgIGNvbnN0IFNwbGl0dGVkID0gUmVsUGF0aC5zcGxpdChwYXRoLnNlcCk7XHJcblxyXG4gICAgICAgIHRoaXMuTG9jYWxQYXRocyA9IFNwbGl0dGVkLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGFjYyA9IGFjY1tjdXJyXTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCBSb290UGF0aHMgYXMgYW55KTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUVudmlyb25tZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVFbnZpcm9ubWVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5pc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xyXG4gICAgICAgIHRoaXMuaXNEZXZlbG9wbWVudCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xyXG5cclxuICAgICAgICBpZih0aGlzLkxvY2FsUGF0aHNbJ3d3d3Jvb3QnXSl7XHJcbiAgICAgICAgICAgIHRoaXMub3V0cHV0RGlyID0gdGhpcy5Mb2NhbFBhdGhzWyd3d3dyb290J10udG9BYnNvbHV0ZVBhdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2dvUGF0aCA9IHRoaXMubG9jYWxQYXRocy5zcmMubG9nb1snaWNvbi01MTIucG5nJ10udG9BYnNvbHV0ZVBhdGgoKTtcclxuICAgIH1cclxufVxyXG4iLCAiZXhwb3J0IGNsYXNzIENvbmZpZ0Jhc2Uge1xyXG4gICAgcHVibGljIHJvb3REaXI6IHN0cmluZztcclxuICAgIHB1YmxpYyBSb290RGlyOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcHJvamVjdE5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzaG9ydE5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBkZXZlbG9wZXJOYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZGV2ZWxvcGVyVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcclxufVxyXG4iLCAiZXhwb3J0IGNvbnN0IExPQ0FMX0NPTkZJRyA9IFN5bWJvbCgnTE9DQUxfQ09ORklHJyk7XHJcblxyXG5pbXBvcnQgeyBDb25maWdCYXNlIH0gZnJvbSAnLi9jb25maWdzLmJhc2UnO1xyXG5cclxuaW1wb3J0IHsgcm9vdENvbmZpZyB9IGZyb20gJyNyb290L2NvbmZpZ3MnO1xyXG5pbXBvcnQgeyBibGF6b3JBcHBDb25maWcgfSBmcm9tICcjYmxhem9yLWFwcC9jb25maWdzJztcclxuaW1wb3J0IHsgYXV0aENvbmZpZyB9IGZyb20gJyNhdXRoL2NvbmZpZ3MnO1xyXG5cclxuLy8gaW1wb3J0IHsgaWRlbnRpdHlTZXJ2ZXJDb25maWcgfSBmcm9tICdASWRlbnRpdHlTZXJ2ZXIvY29uZmlncyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBzaGFyZWRQYXRocyB9IGZyb20gJy4vcGF0aHMnO1xyXG5cclxuY2xhc3MgU2hhcmVkQ29uZmlnIGV4dGVuZHMgQ29uZmlnQmFzZSB7XHJcbiAgICByb290RGlyID0gc2hhcmVkUGF0aHMudG9BYnNvbHV0ZVBhdGgoKTtcclxuICAgIFJvb3REaXIgPSBzaGFyZWRQYXRocy50b0Fic29sdXRlUGF0aCgpO1xyXG4gICAgcHJvamVjdE5hbWUgPSBwYXRoLmJhc2VuYW1lKFwiQzpcXFxcQXBwXFxcXEpzXFxcXGFwcHNcXFxcc2hhcmVkXCIpO1xyXG4gICAgbmFtZSA9ICdTaGFyZWQgTGlicmFyeSc7XHJcbiAgICB0aXRsZSA9ICdBcHAgdGl0bGUnO1xyXG4gICAgc2hvcnROYW1lID0gJ0FwcCBzaG9ydCBuYW1lJztcclxuICAgIGRldmVsb3Blck5hbWUgPSAnVGFuZSBLaW0nO1xyXG4gICAgZGV2ZWxvcGVyVXJsID0gJ3d3dy50YW5ld2FyZS5jb20nO1xyXG4gICAgZGVzY3JpcHRpb24gPSAnYXBwIGRlc2MnO1xyXG4gICAgZGVwZW5kZW50UHJvamVjdHMgPSBbXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoYXJlZENvbmZpZyA9IG5ldyBTaGFyZWRDb25maWcoKTtcclxuXHJcbmNsYXNzIENvbmZpZ3Mge1xyXG4gICAgYWxsQ29uZmlnczogQ29uZmlnQmFzZVtdID0gW3Jvb3RDb25maWcsIHNoYXJlZENvbmZpZywgYmxhem9yQXBwQ29uZmlnLCBhdXRoQ29uZmlnXTtcclxuXHJcbiAgICBnZXQgYWxsUm9vdERpcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsQ29uZmlncy5tYXAoKGNvbmZpZykgPT4gY29uZmlnLnJvb3REaXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlncyA9IG5ldyBDb25maWdzKCk7XHJcbiIsICJpbXBvcnQgeyByb290UGF0aHMgfSBmcm9tIFwiI3Jvb3QvcGF0aHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzaGFyZWRQYXRocyA9IHJvb3RQYXRocy5hcHBzLnNoYXJlZDtcclxuIiwgImltcG9ydCB7IEN1c3RvbUluamVjdGFibGUgfSBmcm9tICcjc2hhcmVkL3NyYy9mdW5jdGlvbnMvcHJvY2Vzcy1wcm92aWRlcnMnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBtZXJnZUN1c3RvbWl6ZXIgfSBmcm9tICcuL21lcmdlLXdpdGgtY3VzdG9taXplcic7XHJcblxyXG5AQ3VzdG9tSW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNZXJnZVNlcnZpY2Uge1xyXG4gICAgbWVyZ2VPcHRpb25zKC4uLm9ianM6IGFueVtdKSB7XHJcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShvYmpzWzBdKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmpzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5tZXJnZVdpdGgoYWNjLCBjdXJyLCBtZXJnZUN1c3RvbWl6ZXIoKSk7XHJcbiAgICAgICAgICAgIH0sIFtdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvYmpzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLm1lcmdlV2l0aChhY2MsIGN1cnIsIG1lcmdlQ3VzdG9taXplcigpKTtcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgc21hcnRseU1lcmdlT3B0aW9ucyhvYmoxOiBhbnksIG9iajI6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IHRvTWVyZ2UgPSBbb2JqMSwgb2JqMl0uZmxhdChJbmZpbml0eSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLm1lcmdlT3B0aW9ucyguLi50b01lcmdlKTtcclxuICAgIH1cclxufVxyXG4iLCAiZXhwb3J0IGNsYXNzIE1lcmdlQ29tbWFuZE9wdGlvbiB7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgdG9rZW4gPSB7fTtcclxuXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgYXBwZW5kOiBhbnkgPSB7IG5hbWU6ICdhcHBlbmQnLCB0b2tlbjogTWVyZ2VDb21tYW5kT3B0aW9uLnRva2VuIH07XHJcblxyXG4gICAgc3RhdGljIHJlYWRvbmx5IHByZXBlbmQ6IGFueSA9IHsgbmFtZTogJ3ByZXBlbmQnLCB0b2tlbjogTWVyZ2VDb21tYW5kT3B0aW9uLnRva2VuIH07XHJcblxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG92ZXJ3cml0ZTogYW55ID0geyBuYW1lOiAnb3ZlcndyaXRlJywgdG9rZW46IE1lcmdlQ29tbWFuZE9wdGlvbi50b2tlbiB9O1xyXG5cclxuICAgIHN0YXRpYyByZWFkb25seSBvdmVyd3JpdGVDb21tYW5kc09ubHk6IGFueSA9IHsgbmFtZTogJ292ZXJ3cml0ZUNvbW1hbmRzT25seScsIHRva2VuOiBNZXJnZUNvbW1hbmRPcHRpb24udG9rZW4gfTtcclxuXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgZ2V0T3ZlcndyaXR0ZW46IGFueSA9IHsgbmFtZTogJ2dldE92ZXJ3cml0dGVuJywgdG9rZW46IE1lcmdlQ29tbWFuZE9wdGlvbi50b2tlbiB9O1xyXG5cclxuICAgIHN0YXRpYyByZWFkb25seSBkZWxldGVMYXN0T25lOiBhbnkgPSB7IG5hbWU6ICdkZWxldGVMYXN0T25lJywgdG9rZW46IE1lcmdlQ29tbWFuZE9wdGlvbi50b2tlbiB9O1xyXG5cclxuICAgIHN0YXRpYyByZWFkb25seSBkZWxldGVGaXJzdE9uZTogYW55ID0geyBuYW1lOiAnZGVsZXRlRmlyc3RPbmUnLCB0b2tlbjogTWVyZ2VDb21tYW5kT3B0aW9uLnRva2VuIH07XHJcblxyXG4gICAgc3RhdGljIHJlYWRvbmx5IGRlbGV0ZUZpcnN0TjogYW55ID0geyBuYW1lOiAnZGVsZXRlRmlyc3ROJywgdG9rZW46IE1lcmdlQ29tbWFuZE9wdGlvbi50b2tlbiB9O1xyXG5cclxuICAgIHN0YXRpYyByZWFkb25seSBkZWxldGVMYXN0TjogYW55ID0geyBuYW1lOiAnZGVsZXRlTGFzdE4nLCB0b2tlbjogTWVyZ2VDb21tYW5kT3B0aW9uLnRva2VuIH07XHJcblxyXG4gICAgc3RhdGljIHJlYWRvbmx5IG1ha2VUaGVtVW5pcXVlOiBhbnkgPSB7IG5hbWU6ICdtYWtlVGhlbVVuaXF1ZScsIHRva2VuOiBNZXJnZUNvbW1hbmRPcHRpb24udG9rZW4gfTtcclxuXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgY3VzdG9tTWVyZ2U6IGFueSA9IHsgbmFtZTogJ2N1c3RvbU1lcmdlJywgdG9rZW46IE1lcmdlQ29tbWFuZE9wdGlvbi50b2tlbiB9O1xyXG59XHJcbiIsICJpbXBvcnQgeyBNZXJnZUNvbW1hbmRPcHRpb24gfSBmcm9tICcuL21lcmdlLWNvbW1hbmQtb3B0aW9uJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUN1c3RvbWl6ZXIobWVyZ2VEZWZhdWx0OiBNZXJnZUNvbW1hbmRPcHRpb24gPSBNZXJnZUNvbW1hbmRPcHRpb24uYXBwZW5kKSB7XHJcbiAgICByZXR1cm4gKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSwgc3RhY2spID0+IHtcclxuICAgICAgICAvLyBpZiAoc3JjVmFsdWUgJiYgc3JjVmFsdWVbMF0/Lm5hbWUgPT09ICdwcmVwZW5kJykge1xyXG4gICAgICAgIC8vICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGlmIChfLmlzTmlsKG9ialZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3JjVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoXy5pc09iamVjdChvYmpWYWx1ZSkgJiYgXy5pc09iamVjdChzcmNWYWx1ZSkpIHtcclxuICAgICAgICAgICAgaWYgKChfLmlzQXJyYXkob2JqVmFsdWUpICYmICFfLmlzQXJyYXkoc3JjVmFsdWUpKSB8fCAoIV8uaXNBcnJheShvYmpWYWx1ZSkgJiYgXy5pc0FycmF5KHNyY1ZhbHVlKSkpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvcGVydHkgdHlwZSBtaXNtYXRjaC4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzcmNWYWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNyY1ZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF8uaXNBcnJheShvYmpWYWx1ZSkpIHtcclxuICAgICAgICAgICAgaWYgKG9ialZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b1JldHVybiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIG9ialZhbHVlLmZvckVhY2goKHMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc1swXT8udG9rZW4gIT09IE1lcmdlQ29tbWFuZE9wdGlvbi50b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzID0gW21lcmdlRGVmYXVsdCwgW3NdXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBzWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXJnZUNvbW1hbmRPcHRpb24ucHJlcGVuZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuID0gW10uY29uY2F0KHNbMV0pLmNvbmNhdCh0b1JldHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXJnZUNvbW1hbmRPcHRpb24ub3ZlcndyaXRlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9SZXR1cm4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuID0gdG9SZXR1cm4uY29uY2F0KHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTWVyZ2VDb21tYW5kT3B0aW9uLm92ZXJ3cml0ZUNvbW1hbmRzT25seTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuID0gdG9SZXR1cm4uZmlsdGVyKCh0KSA9PiB0WzBdPy50b2tlbiAhPT0gTWVyZ2VDb21tYW5kT3B0aW9uLnRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuID0gdG9SZXR1cm4uY29uY2F0KHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTWVyZ2VDb21tYW5kT3B0aW9uLmdldE92ZXJ3cml0dGVuOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTWVyZ2VDb21tYW5kT3B0aW9uLmFwcGVuZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuID0gdG9SZXR1cm4uY29uY2F0KHNbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTWVyZ2VDb21tYW5kT3B0aW9uLmRlbGV0ZUZpcnN0T25lOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9SZXR1cm4uc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE1lcmdlQ29tbWFuZE9wdGlvbi5kZWxldGVGaXJzdE46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1JldHVybi5zcGxpY2UoMCwgc1sxXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXJnZUNvbW1hbmRPcHRpb24uZGVsZXRlTGFzdE9uZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTWVyZ2VDb21tYW5kT3B0aW9uLmRlbGV0ZUxhc3ROOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9SZXR1cm4uc3BsaWNlKHRvUmV0dXJuLmxlbmd0aCAtIHNbMV1bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTWVyZ2VDb21tYW5kT3B0aW9uLm1ha2VUaGVtVW5pcXVlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9SZXR1cm4gPSBfLnVuaXEodG9SZXR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTWVyZ2VDb21tYW5kT3B0aW9uLmN1c3RvbU1lcmdlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9SZXR1cm4gPSBzWzFdWzBdKHRvUmV0dXJuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9SZXR1cm4ucHVzaChzWzFdWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9ialZhbHVlID0gdG9SZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfLmlzQXJyYXkoc3JjVmFsdWUpICYmIHNyY1ZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b1JldHVybiA9IG9ialZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHNyY1ZhbHVlLmZvckVhY2goKHMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc1swXT8udG9rZW4gIT09IE1lcmdlQ29tbWFuZE9wdGlvbi50b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzID0gW21lcmdlRGVmYXVsdCwgc107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21tYW5kID0gc1swXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTWVyZ2VDb21tYW5kT3B0aW9uLnByZXBlbmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1JldHVybiA9IFtdLmNvbmNhdChzWzFdKS5jb25jYXQodG9SZXR1cm4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTWVyZ2VDb21tYW5kT3B0aW9uLm92ZXJ3cml0ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1JldHVybiA9IHRvUmV0dXJuLmNvbmNhdChzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE1lcmdlQ29tbWFuZE9wdGlvbi5vdmVyd3JpdGVDb21tYW5kc09ubHk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1JldHVybiA9IHRvUmV0dXJuLmZpbHRlcigodCkgPT4gdFswXT8udG9rZW4gIT09IE1lcmdlQ29tbWFuZE9wdGlvbi50b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1JldHVybiA9IHRvUmV0dXJuLmNvbmNhdChzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE1lcmdlQ29tbWFuZE9wdGlvbi5nZXRPdmVyd3JpdHRlbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE1lcmdlQ29tbWFuZE9wdGlvbi5hcHBlbmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1JldHVybiA9IHRvUmV0dXJuLmNvbmNhdChzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE1lcmdlQ29tbWFuZE9wdGlvbi5kZWxldGVGaXJzdE9uZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXJnZUNvbW1hbmRPcHRpb24uZGVsZXRlRmlyc3ROOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9SZXR1cm4uc3BsaWNlKDAsIHNbMV1bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTWVyZ2VDb21tYW5kT3B0aW9uLmRlbGV0ZUxhc3RPbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1JldHVybi5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE1lcmdlQ29tbWFuZE9wdGlvbi5kZWxldGVMYXN0TjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuLnNwbGljZSh0b1JldHVybi5sZW5ndGggLSBzWzFdWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE1lcmdlQ29tbWFuZE9wdGlvbi5tYWtlVGhlbVVuaXF1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuID0gXy51bmlxKHRvUmV0dXJuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIE1lcmdlQ29tbWFuZE9wdGlvbi5jdXN0b21NZXJnZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuID0gc1sxXVswXSh0b1JldHVybik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUmV0dXJuLnB1c2goc1sxXVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbiIsICJpbXBvcnQgeyBDdXN0b21JbmplY3QsIEN1c3RvbUluamVjdGFibGUgfSBmcm9tICcjc2hhcmVkL3NyYy9mdW5jdGlvbnMvcHJvY2Vzcy1wcm92aWRlcnMnO1xyXG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL2Vudmlyb25tZW50L2Vudmlyb25tZW50L2Vudmlyb25tZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBWaXRlUGx1Z2luR2xvYklucHV0U2VydmljZSB9IGZyb20gJy4uL3ZpdGUtcGx1Z2luLWdsb2ItaW5wdXQvdml0ZS1wbHVnaW4tZ2xvYi1pbnB1dC5zZXJ2aWNlJztcclxuXHJcblxyXG5AQ3VzdG9tSW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXRlUGx1Z2luc1NlcnZpY2Uge1xyXG4gICAgQEN1c3RvbUluamVjdChFbnZpcm9ubWVudFNlcnZpY2UpXHJcbiAgICBwcm90ZWN0ZWQgZW52aXJvbm1lbnRTZXJ2aWNlOiBFbnZpcm9ubWVudFNlcnZpY2U7XHJcblxyXG4gICAgQEN1c3RvbUluamVjdChWaXRlUGx1Z2luR2xvYklucHV0U2VydmljZSlcclxuICAgIHByb3RlY3RlZCB2aXRlUGx1Z2luR2xvYklucHV0U2VydmljZTogVml0ZVBsdWdpbkdsb2JJbnB1dFNlcnZpY2U7XHJcblxyXG4gICAgY3JlYXRlTWFueVBsdWdpbnMoKSB7XHJcbiAgICAgICAgbGV0IHBsdWdpbnMgPSBbXTtcclxuICAgICAgICAvLyBwcmVQbHVnaW5zLnB1c2godGhpcy53ZWJwYWNrV2VicGFja1dhdGNoRmlsZXNQbHVnaW5TZXJ2aWNlLmNyZWF0ZVBsdWdpbigpKTtcclxuICAgICAgICBwbHVnaW5zLnB1c2godGhpcy52aXRlUGx1Z2luR2xvYklucHV0U2VydmljZS5jcmVhdGVQbHVnaW4oKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwbHVnaW5zO1xyXG4gICAgfVxyXG59XHJcbiIsICJcclxuXHJcbmltcG9ydCB7IENsZWFuV2VicGFja1BsdWdpbiB9IGZyb20gJ2NsZWFuLXdlYnBhY2stcGx1Z2luJztcclxuaW1wb3J0IHsgQ3VzdG9tSW5qZWN0YWJsZSB9IGZyb20gJyNzaGFyZWQvc3JjL2Z1bmN0aW9ucy9wcm9jZXNzLXByb3ZpZGVycyc7XHJcbi8vIGltcG9ydCB7IEN1c3RvbUluamVjdGFibGUgfSBmcm9tICcuLi8uLi8uLi9mdW5jdGlvbnMvcHJvY2Vzcy13ZWJwYWNrLXByb3ZpZGVycyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBjb25maWdzIH0gZnJvbSAnI3NoYXJlZC9jb25maWdzJztcclxuaW1wb3J0IHsgVml0ZVBsdWdpbkJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vdml0ZS1wbHVnaW4tYmFzZS92aXRlLXBsdWdpbi1iYXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgc2FuaXRpemVGaWxlbmFtZSBmcm9tICdzYW5pdGl6ZS1maWxlbmFtZSc7XHJcbi8vIGltcG9ydCB7IGNvbmZpZ3NDb2xsZWN0aW9ucyB9IGZyb20gJyNzaGFyZWQvY29uZmlncy1jb2xsZWN0aW9uJztcclxuaW1wb3J0IHtQbHVnaW59IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgaXNTdHJpbmcgZnJvbSAnbG9kYXNoL2lzU3RyaW5nJztcclxuaW1wb3J0IHBhcnRpdGlvbiBmcm9tICdsb2Rhc2gvcGFydGl0aW9uJztcclxuaW1wb3J0IGZhc3RHbG9iIGZyb20gJ2Zhc3QtZ2xvYic7XHJcbi8qKlxyXG4gKiBkZWZhdWx0IG11bHRpLWlucHV0IE9wdGlvbnNcclxuICogKi9cclxuIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgLy8gYHBhdGguc2VwYCBpcyB1c2VkIGZvciB3aW5kb3dzIHN1cHBvcnRcclxuICAgIHJlbGF0aXZlOiBgc3JjJHtwYXRoLnNlcH1gLFxyXG4gIH07XHJcbiAgXHJcbiAgLy8gZXh0cmFjdCB0aGUgb3V0cHV0IGZpbGUgbmFtZSBmcm9tIGEgZmlsZSBuYW1lXHJcbmNvbnN0IG91dHB1dEZpbGVOYW1lID0gKGZpbGVQYXRoKSA9PiB7XHJcbiAgICBjb25zdCBjaHVua0lkID0gc2FuaXRpemVGaWxlbmFtZShmaWxlUGF0aCwgeyByZXBsYWNlbWVudDogJ18nIH0pO1xyXG4gICAgcmV0dXJuIGNodW5rSWQ7XHJcbn1cclxuICBcclxuXHJcbkBDdXN0b21JbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpdGVQbHVnaW5HbG9iSW5wdXRTZXJ2aWNlIGV4dGVuZHMgVml0ZVBsdWdpbkJhc2VTZXJ2aWNlIHtcclxuICAgIGNyZWF0ZVBsdWdpbihvcHRpb25zOmFueSA9IGRlZmF1bHRPcHRpb25zKXtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGdsb2I6IGdsb2JPcHRpb25zLFxyXG4gICAgICAgICAgICByZWxhdGl2ZSA9IGRlZmF1bHRPcHRpb25zLnJlbGF0aXZlLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm1PdXRwdXRQYXRoLFxyXG4gICAgICAgICAgfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgbmFtZTogJ3ZpdGUtcGx1Z2luLWdsb2ItaW5wdXQnLFxyXG4gICAgICAgICAgICBvcHRpb25zKGNvbmYpIHtcclxuICAgICAgICAgICAgICAvLyBmbGF0IHRvIGVuYWJsZSBpbnB1dCB0byBiZSBhIHN0cmluZyBvciBhbiBhcnJheVxyXG4gICAgICAgICAgICAgIC8vIHNlcGFyYXRlIGdsb2JzIGlucHV0cyBzdHJpbmcgZnJvbSBvdGhlcnMgdG8gZW5hYmxlIGlucHV0IHRvIGJlIGEgbWl4ZWQgYXJyYXkgdG9vXHJcbiAgICAgICAgICAgICAgY29uc3QgW2dsb2JzLCBvdGhlcnNdID0gcGFydGl0aW9uKFtjb25mLmlucHV0XS5mbGF0KCksIGlzU3RyaW5nKTtcclxuICAgICAgICAgICAgICBjb25zdCBub3JtYWxpemVkR2xvYnMgPSBnbG9icy5tYXAoKGdsb2IpID0+IGdsb2IucmVwbGFjZSgvXFxcXC9nLCAnLycpKTtcclxuICAgICAgICAgICAgICAvLyBnZXQgZmlsZXMgZnJvbSB0aGUgZ2xvYnMgc3RyaW5ncyBhbmQgcmV0dXJuIGFzIGEgUm9sbHVwIGVudHJpZXMgT2JqZWN0XHJcbiAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBPYmplY3RcclxuICAgICAgICAgICAgICAgIC5hc3NpZ24oXHJcbiAgICAgICAgICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgICAgICAgICBPYmplY3QuZnJvbUVudHJpZXMoZmFzdEdsb2JcclxuICAgICAgICAgICAgICAgICAgICAuc3luYyhub3JtYWxpemVkR2xvYnMsIGdsb2JPcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGgucmVsYXRpdmUocmVsYXRpdmUsIGVudHJ5Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNSZWxhdGl2ZSA9ICFmaWxlUGF0aC5zdGFydHNXaXRoKGAuLiR7cGF0aC5zZXB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxhdGl2ZUZpbGVQYXRoID0gKGlzUmVsYXRpdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBmaWxlUGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHBhdGgucmVsYXRpdmUoYC4ke3BhdGguc2VwfWAsIGVudHJ5Lm5hbWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1PdXRwdXRQYXRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbb3V0cHV0RmlsZU5hbWUodHJhbnNmb3JtT3V0cHV0UGF0aChyZWxhdGl2ZUZpbGVQYXRoLCBlbnRyeS5uYW1lKSksIGVudHJ5Lm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtvdXRwdXRGaWxlTmFtZShyZWxhdGl2ZUZpbGVQYXRoKSwgZW50cnkubmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICAgICAgICAvLyBhZGQgbm8gZ2xvYnMgaW5wdXQgdG8gdGhlIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgICAuLi5vdGhlcnMsXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgbmV3IGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgZ2xvYiBpbnB1dCBhbmQgdGhlIG5vbiBzdHJpbmcgaW5wdXRzXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLmNvbmYsXHJcbiAgICAgICAgICAgICAgICBpbnB1dCxcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwgImltcG9ydCB7IEN1c3RvbUluamVjdCwgQ3VzdG9tSW5qZWN0YWJsZSB9IGZyb20gJyNzaGFyZWQvc3JjL2Z1bmN0aW9ucy9wcm9jZXNzLXByb3ZpZGVycyc7XHJcbmltcG9ydCB7IEVudmlyb25tZW50U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvZW52aXJvbm1lbnQvZW52aXJvbm1lbnQvZW52aXJvbm1lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IE1lcmdlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvdXRpbGl0aWVzL21lcmdlL21lcmdlL21lcmdlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1BsdWdpbn0gZnJvbSAndml0ZSc7XHJcbkBDdXN0b21JbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpdGVQbHVnaW5CYXNlU2VydmljZSB7XHJcbiAgICBAQ3VzdG9tSW5qZWN0KE1lcmdlU2VydmljZSlcclxuICAgIHByb3RlY3RlZCBtZXJnZVNlcnZpY2U6IE1lcmdlU2VydmljZTtcclxuXHJcbiAgICBAQ3VzdG9tSW5qZWN0KEVudmlyb25tZW50U2VydmljZSlcclxuICAgIHByb3RlY3RlZCBlbnZpcm9ubWVudFNlcnZpY2U6IEVudmlyb25tZW50U2VydmljZTtcclxuXHJcbiAgICBjcmVhdGVQbHVnaW48VCA9IGFueT4oLi4ub3B0aW9uczogVFtdKTogUGx1Z2luIHtcclxuICAgICAgICByZXR1cm4ge30gYXMgYW55XHJcbiAgICB9XHJcbn1cclxuIiwgImltcG9ydCB7IFZpdGVCYXNlU2VydmljZSB9IGZyb20gJy4uL3ZpdGUtYmFzZS92aXRlLWJhc2Uuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBDdXN0b21JbmplY3QsIEN1c3RvbUluamVjdGFibGUgfSBmcm9tICcjc2hhcmVkL3NyYy9mdW5jdGlvbnMvcHJvY2Vzcy1wcm92aWRlcnMnO1xyXG5pbXBvcnQgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IFZpdGVTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vdml0ZS1zaGFyZWQvdml0ZS1zaGFyZWQuc2VydmljZSc7XHJcblxyXG5AQ3VzdG9tSW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXRlRGV2U2VydmljZSBleHRlbmRzIFZpdGVCYXNlU2VydmljZSB7XHJcbiAgICBAQ3VzdG9tSW5qZWN0KFZpdGVTaGFyZWRTZXJ2aWNlKVxyXG4gICAgcHJvdGVjdGVkIHZpdGVTaGFyZWRTZXJ2aWNlOiBWaXRlU2hhcmVkU2VydmljZTtcclxuICAgIFxyXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbihvcHRpb25zPzpVc2VyQ29uZmlnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVyZ2VTZXJ2aWNlLm1lcmdlT3B0aW9ucyhcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ29uZmlndXJhdGlvbigpLFxyXG4gICAgICAgICAgICB0aGlzLnZpdGVTaGFyZWRTZXJ2aWNlLmNyZWF0ZUNvbmZpZ3VyYXRpb24oKSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW9kZTonZGV2ZWxvcG1lbnQnLFxyXG4gICAgICAgICAgICAgICAgYnVpbGQ6e1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbmlmeTpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBhcyBVc2VyQ29uZmlnLFxyXG4gICAgICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTWFueUNvbmZpZ3VyYXRpb25zKCl7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG59XHJcbiIsICJpbXBvcnQgeyBWaXRlQmFzZVNlcnZpY2UgfSBmcm9tICcuLi9WaXRlLWJhc2UvVml0ZS1iYXNlLnNlcnZpY2UnO1xyXG5cclxuXHJcbmltcG9ydCB7IEN1c3RvbUluamVjdGFibGUgfSBmcm9tICcjc2hhcmVkL3NyYy9mdW5jdGlvbnMvcHJvY2Vzcy1wcm92aWRlcnMnO1xyXG5pbXBvcnQgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcblxyXG5AQ3VzdG9tSW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXRlU2hhcmVkU2VydmljZSBleHRlbmRzIFZpdGVCYXNlU2VydmljZSB7XHJcbiAgXHJcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKG9wdGlvbnM/OlVzZXJDb25maWcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZXJnZVNlcnZpY2UubWVyZ2VPcHRpb25zKFxyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDb25maWd1cmF0aW9uKCkse1xyXG4gICAgICAgICAgICAgICAgcGx1Z2luczpbXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZTp7XHJcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uczpbJy5tanMnLCAnLmpzJywgJy50cycsICcuanN4JywgJy50c3gnLCAnLmpzb24nXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNzczp7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZGl0aW9uYWxEYXRhOiBgJGluamVjdGVkQ29sb3I6IG9yYW5nZTtgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBqc29uOntcclxuICAgICAgICAgICAgICAgICAgICBuYW1lZEV4cG9ydHM6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmdpZnk6ZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlc2J1aWxkOntcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBhcyBVc2VyQ29uZmlnLFxyXG4gICAgICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwgImltcG9ydCB7IEdsb2JhbCwgSW5qZWN0LCBJbmplY3RhYmxlLCBNb2R1bGUsIE1vZHVsZU1ldGFkYXRhIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBOZXN0RmFjdG9yeSB9IGZyb20gJ0BuZXN0anMvY29yZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc1Byb3ZpZGVycyhwcm92aWRlcnM6IGFueVtdKSB7XHJcbiAgICBjb25zdCBwcm9jZXNzZWRQcm92aWRlcnMgPSBwcm92aWRlcnMgPz8gW107XHJcblxyXG4gICAgcmV0dXJuIHByb2Nlc3NlZFByb3ZpZGVycy5mbGF0TWFwKChwKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50Q2xhc3MgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocCk7XHJcblxyXG4gICAgICAgIGlmIChpc0NsYXNzKHApICYmIGlzQ2xhc3MocGFyZW50Q2xhc3MpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBwLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IHBhcmVudENsYXNzLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZUNsYXNzOiBwLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NNb2R1bGVPcHRpb25zKG9wdGlvbnM6IE1vZHVsZU1ldGFkYXRhKSB7XHJcbiAgICBjb25zdCB7IHByb3ZpZGVycywgaW1wb3J0cywgZXhwb3J0cyB9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IHByb2Nlc3NlZFByb3ZpZGVycyA9IHByb2Nlc3NQcm92aWRlcnMocHJvdmlkZXJzKTtcclxuICAgIGNvbnN0IHByb2Nlc3NzZWRJbXBvcnRzID0gaW1wb3J0cyA/PyBbXTtcclxuICAgIGxldCBwcm9jZXNzc2VkRXhwb3J0cyA9IGV4cG9ydHMgPz8gW107XHJcblxyXG4gICAgcHJvY2Vzc3NlZEV4cG9ydHMgPSBbXHJcbiAgICAgICAgLi4ucHJvY2Vzc3NlZEV4cG9ydHMsXHJcbiAgICAgICAgLi4ucHJvY2Vzc3NlZEltcG9ydHMsXHJcbiAgICAgICAgLi4ucHJvY2Vzc2VkUHJvdmlkZXJzLm1hcCgoeCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geC5wcm92aWRlID8/IHg7XHJcbiAgICAgICAgfSksXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtcclxuICAgICAgICBwcm92aWRlcnM6IHByb2Nlc3NlZFByb3ZpZGVycyxcclxuICAgICAgICBleHBvcnRzOiBwcm9jZXNzc2VkRXhwb3J0cyxcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0NsYXNzKG9iaikge1xyXG4gICAgY29uc3QgaXNDdG9yQ2xhc3MgPSBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDUpID09PSAnY2xhc3MnO1xyXG4gICAgaWYgKG9iai5wcm90b3R5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBpc0N0b3JDbGFzcztcclxuICAgIH1cclxuICAgIGNvbnN0IGlzUHJvdG90eXBlQ3RvckNsYXNzID1cclxuICAgICAgICBvYmoucHJvdG90eXBlLmNvbnN0cnVjdG9yICYmXHJcbiAgICAgICAgb2JqLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci50b1N0cmluZyAmJlxyXG4gICAgICAgIG9iai5wcm90b3R5cGUuY29uc3RydWN0b3IudG9TdHJpbmcoKS5zdWJzdHJpbmcoMCwgNSkgPT09ICdjbGFzcyc7XHJcbiAgICByZXR1cm4gaXNDdG9yQ2xhc3MgfHwgaXNQcm90b3R5cGVDdG9yQ2xhc3M7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDdXN0b21Nb2R1bGUobWV0YURhdGE6IE1vZHVsZU1ldGFkYXRhKSB7XHJcbiAgICByZXR1cm4gKHRhcmdldCkgPT4ge1xyXG4gICAgICAgIC8vIG1ldGFEYXRhPy5wcm92aWRlcnM/LmZvckVhY2goKHApID0+IHtcclxuICAgICAgICAvLyAgICAgYXV0b0luamVjdGFibGUoKSh0YXJnZXQpO1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAvLyBjb25zdCB7IEdsb2JhbCwgTW9kdWxlIH0gPSByZXF1aXJlKCdAbmVzdGpzL2NvbW1vbicpO1xyXG4gICAgICAgIGlmICghbWV0YURhdGE/LmV4cG9ydHMpIHtcclxuICAgICAgICAgICAgbWV0YURhdGEuZXhwb3J0cyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW1ldGFEYXRhPy5pbXBvcnRzKSB7XHJcbiAgICAgICAgICAgIG1ldGFEYXRhLmltcG9ydHMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFtZXRhRGF0YT8ucHJvdmlkZXJzKSB7XHJcbiAgICAgICAgICAgIG1ldGFEYXRhLnByb3ZpZGVycyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaW1wb3J0c0Zyb21PdGhlcnMgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdpbXBvcnRzJywgdGFyZ2V0KSA/PyBbXTtcclxuXHJcbiAgICAgICAgY29uc3QgZiA9IChvYmopID0+IG9ialsnbmFtZSddID8/IG9iajtcclxuXHJcbiAgICAgICAgLy8gaW1wb3J0c0Zyb21PdGhlcnMuZm9yRWFjaCgoaW1wb3J0ZWQpID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc3QgaW1wb3J0c0Zyb21PdGhlcnMgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdpbXBvcnRzJywgaW1wb3J0ZWQpID8/IFtdO1xyXG4gICAgICAgIC8vICAgICBjb25zdCBleHBvcnRzRnJvbU90aGVycyA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ2V4cG9ydHMnLCBpbXBvcnRlZCkgPz8gW107XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHByb3ZpZGVyc0Zyb21PdGhlcnMgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdwcm92aWRlcnMnLCBpbXBvcnRlZCkgPz8gW107XHJcblxyXG4gICAgICAgIC8vICAgICBtZXRhRGF0YS5leHBvcnRzID0gXy51bmlxQnkoZXhwb3J0c0Zyb21PdGhlcnMuY29uY2F0KG1ldGFEYXRhLmV4cG9ydHMpLCBmKTtcclxuXHJcbiAgICAgICAgLy8gICAgIG1ldGFEYXRhLmltcG9ydHMgPSBfLnVuaXFCeShpbXBvcnRzRnJvbU90aGVycy5jb25jYXQobWV0YURhdGEuaW1wb3J0cyksIGYpO1xyXG4gICAgICAgIC8vICAgICBtZXRhRGF0YS5wcm92aWRlcnMgPSBfLnVuaXFCeShwcm92aWRlcnNGcm9tT3RoZXJzLmNvbmNhdChtZXRhRGF0YS5wcm92aWRlcnMpLCBmKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgTW9kdWxlKHByb2Nlc3NNb2R1bGVPcHRpb25zKG1ldGFEYXRhKSkodGFyZ2V0KTtcclxuICAgICAgICBHbG9iYWwoKSh0YXJnZXQpO1xyXG5cclxuICAgICAgICAvLyBjb25zdCBleHBvcnRzRnJvbU90aGVyczIgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdleHBvcnRzJywgdGFyZ2V0KSA/PyBbXTtcclxuICAgICAgICAvLyBjb25zdCBpbXBvcnRzRnJvbU90aGVyczIgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdpbXBvcnRzJywgdGFyZ2V0KSA/PyBbXTtcclxuICAgICAgICAvLyBjb25zdCBwcm92aWRlcnNGcm9tT3RoZXJzMiA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ3Byb3ZpZGVycycsIHRhcmdldCkgPz8gW107XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFQnKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0YXJnZXQubmFtZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0VFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUUnKTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihleHBvcnRzRnJvbU90aGVyczIpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIoaW1wb3J0c0Zyb21PdGhlcnMyKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAnKTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihwcm92aWRlcnNGcm9tT3RoZXJzMik7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ3VzdG9tSW5qZWN0YWJsZShvcHRpb25zPykge1xyXG4gICAgcmV0dXJuICh0YXJnZXQpID0+IHtcclxuICAgICAgICAvLyBjb25zdCB7IEluamVjdGFibGUgfSA9IHJlcXVpcmUoJ0BuZXN0anMvY29tbW9uJyk7XHJcbiAgICAgICAgSW5qZWN0YWJsZShvcHRpb25zKSh0YXJnZXQpO1xyXG5cclxuICAgICAgICAvLyBhdXRvSW5qZWN0YWJsZSgpKHRhcmdldCk7XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBDdXN0b21JbmplY3QodG9rZW4pOiAodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nIHwgc3ltYm9sLCBpbmRleD86IG51bWJlcikgPT4gdm9pZCB7XHJcbiAgICByZXR1cm4gKHRhcmdldDogYW55LCBrZXksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICBJbmplY3QodG9rZW4pKHRhcmdldCwga2V5LCBpbmRleCk7XHJcbiAgICAgICAgLy8gaW5qZWN0KHRva2VuKSh0YXJnZXQsIGtleSwgaW5kZXgpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1c3R1bUNvbnRhaW5lciB7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuXHJcbiAgICBjb250YWluZXI7XHJcblxyXG4gICAgYXN5bmMgaW5pdChtb2R1bGU/KSB7XHJcbiAgICAgICAgY29uc3QgYXBwID0gYXdhaXQgTmVzdEZhY3RvcnkuY3JlYXRlKG1vZHVsZSk7XHJcbiAgICAgICAgYXdhaXQgYXBwLmluaXQoKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGFwcDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KG9iaikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0KG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IG9iaigpO1xyXG4gICAgfVxyXG59XHJcbiIsICJpbXBvcnQgeyBDdXN0b21Nb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9mdW5jdGlvbnMvcHJvY2Vzcy1wcm92aWRlcnMnO1xyXG5cclxuaW1wb3J0IHsgTWVyZ2VTZXJ2aWNlIH0gZnJvbSAnLi9tZXJnZS9tZXJnZS5zZXJ2aWNlJztcclxuXHJcbkBDdXN0b21Nb2R1bGUoe1xyXG4gICAgcHJvdmlkZXJzOiBbTWVyZ2VTZXJ2aWNlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lcmdlTW9kdWxlIHt9XHJcbiIsICJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgQ3VzdG9tSW5qZWN0YWJsZSB9IGZyb20gJyNzaGFyZWQvc3JjL2Z1bmN0aW9ucy9wcm9jZXNzLXByb3ZpZGVycyc7XHJcblxyXG5AQ3VzdG9tSW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZWdleFNlcnZpY2Uge1xyXG4gICAgZXNjYXBlUmVnRXhwKHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvWy4qK1xcLT9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTsgLy8gJCYgbWVhbnMgdGhlIHdob2xlIG1hdGNoZWQgc3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgZXNjYXBlUmVnRXhwSWZTdHIoYXJnOiBzdHJpbmcgfCBSZWdFeHApIHtcclxuICAgICAgICBpZiAoYXJnIGluc3RhbmNlb2YgUmVnRXhwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5lc2NhcGVSZWdFeHAoYXJnKTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZVJlZ2V4KG9wdGlvbnM6IHtcclxuICAgICAgICBzdGFydHNXaXRoVGhlc2VXb3Jkcz86IHN0cmluZ1tdO1xyXG4gICAgICAgIGRvZXNOb3RTdGFydFdpdGhUaGVzZVdvcmRzPzogc3RyaW5nW107XHJcblxyXG4gICAgICAgIGNvbnRhaW5zVGhlc2VXb3Jkcz86IHN0cmluZ1tdO1xyXG4gICAgICAgIGRvZXNOb3RDb250YWluVGhlc2VXb3Jkcz86IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBlbmRzV2l0aFRoZXNlV29yZHM/OiBzdHJpbmdbXTtcclxuICAgICAgICBkb2VzTm90RW5kc1dpdGhUaGVzZVdvcmRzPzogc3RyaW5nW107XHJcblxyXG4gICAgICAgIGNhc2VJbnNlbnNpdGl2ZT86IGJvb2xlYW47XHJcbiAgICB9KSB7XHJcbiAgICAgICAgbGV0IHRvUmV0dXJuID0gJyc7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvQ29udGFpbiA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIV8uaXNFbXB0eShvcHRpb25zLnN0YXJ0c1dpdGhUaGVzZVdvcmRzKSkge1xyXG4gICAgICAgICAgICB0b0NvbnRhaW4ucHVzaChcclxuICAgICAgICAgICAgICAgIGAoJHtvcHRpb25zLnN0YXJ0c1dpdGhUaGVzZVdvcmRzXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCh0aGlzLmVzY2FwZVJlZ0V4cElmU3RyLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoeCkgPT4geClcclxuICAgICAgICAgICAgICAgICAgICAuam9pbignfCcpfSlgLFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdG9SZXR1cm4gKz0gJ14nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkob3B0aW9ucy5jb250YWluc1RoZXNlV29yZHMpKSB7XHJcbiAgICAgICAgICAgIHRvQ29udGFpbi5wdXNoKFxyXG4gICAgICAgICAgICAgICAgYC4qKCR7b3B0aW9ucy5jb250YWluc1RoZXNlV29yZHNcclxuICAgICAgICAgICAgICAgICAgICAubWFwKHRoaXMuZXNjYXBlUmVnRXhwSWZTdHIuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgICAgICAgICAubWFwKCh4KSA9PiB4KVxyXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKCd8Jyl9KWAsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIV8uaXNFbXB0eShvcHRpb25zLmVuZHNXaXRoVGhlc2VXb3JkcykpIHtcclxuICAgICAgICAgICAgdG9Db250YWluLnB1c2goXHJcbiAgICAgICAgICAgICAgICBgLiooJHtvcHRpb25zLmVuZHNXaXRoVGhlc2VXb3Jkc1xyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAodGhpcy5lc2NhcGVSZWdFeHBJZlN0ci5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHgpID0+IHggKyAnJCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oJ3wnKX0pYCxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghXy5pc0VtcHR5KHRvQ29udGFpbikpIHtcclxuICAgICAgICAgICAgdG9SZXR1cm4gKz0gLyg/PUEpLy5zb3VyY2UucmVwbGFjZSgnQScsIHRvQ29udGFpbi5qb2luKCcnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBub3RUb0NvbnRhaW4gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkob3B0aW9ucy5kb2VzTm90U3RhcnRXaXRoVGhlc2VXb3JkcykpIHtcclxuICAgICAgICAgICAgbm90VG9Db250YWluLnB1c2goXHJcbiAgICAgICAgICAgICAgICBgKCR7b3B0aW9ucy5kb2VzTm90U3RhcnRXaXRoVGhlc2VXb3Jkc1xyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAodGhpcy5lc2NhcGVSZWdFeHBJZlN0ci5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHgpID0+IHgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oJ3wnKX0pYCxcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHRvUmV0dXJuICs9ICdeJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghXy5pc0VtcHR5KG9wdGlvbnMuZG9lc05vdENvbnRhaW5UaGVzZVdvcmRzKSkge1xyXG4gICAgICAgICAgICBub3RUb0NvbnRhaW4ucHVzaChcclxuICAgICAgICAgICAgICAgIGAuKigke29wdGlvbnMuZG9lc05vdENvbnRhaW5UaGVzZVdvcmRzXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCh0aGlzLmVzY2FwZVJlZ0V4cElmU3RyLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoeCkgPT4geClcclxuICAgICAgICAgICAgICAgICAgICAuam9pbignfCcpfSlgLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFfLmlzRW1wdHkob3B0aW9ucy5kb2VzTm90RW5kc1dpdGhUaGVzZVdvcmRzKSkge1xyXG4gICAgICAgICAgICBub3RUb0NvbnRhaW4ucHVzaChcclxuICAgICAgICAgICAgICAgIGAuKigke29wdGlvbnMuZG9lc05vdEVuZHNXaXRoVGhlc2VXb3Jkc1xyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAodGhpcy5lc2NhcGVSZWdFeHBJZlN0ci5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHgpID0+IHggKyAnJCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oJ3wnKX0pYCxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghXy5pc0VtcHR5KG5vdFRvQ29udGFpbikpIHtcclxuICAgICAgICAgICAgdG9SZXR1cm4gKz0gLyg/IUEpLy5zb3VyY2UucmVwbGFjZSgnQScsIG5vdFRvQ29udGFpbi5qb2luKCd8JykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZsYWdzID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmNhc2VJbnNlbnNpdGl2ZSkge1xyXG4gICAgICAgICAgICBmbGFncyArPSAnaSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG5ldyBSZWdFeHAodG9SZXR1cm4sIGZsYWdzKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHRvUmV0dXJuLCBmbGFncyk7XHJcbiAgICB9XHJcbn1cclxuIiwgImltcG9ydCB7IEN1c3RvbU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2Z1bmN0aW9ucy9wcm9jZXNzLXByb3ZpZGVycyc7XHJcbmltcG9ydCB7IFJlZ2V4U2VydmljZSB9IGZyb20gJy4vcmVnZXgvcmVnZXguc2VydmljZSc7XHJcblxyXG5AQ3VzdG9tTW9kdWxlKHtcclxuICAgIHByb3ZpZGVyczogW1JlZ2V4U2VydmljZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdleE1vZHVsZSB7fVxyXG4iLCAiaW1wb3J0IHsgQ3VzdG9tTW9kdWxlIH0gZnJvbSAnLi4vLi4vZnVuY3Rpb25zL3Byb2Nlc3MtcHJvdmlkZXJzJztcclxuaW1wb3J0IHsgTWVyZ2VNb2R1bGUgfSBmcm9tICcuL21lcmdlL21lcmdlLm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBSZWdleE1vZHVsZSB9IGZyb20gJy4vcmVnZXgvcmVnZXgubW9kdWxlJztcclxuXHJcbkBDdXN0b21Nb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW01lcmdlTW9kdWxlLCBSZWdleE1vZHVsZV0sXHJcbiAgICBwcm92aWRlcnM6IFtdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXRpbGl0aWVzTW9kdWxlIHt9XHJcbiIsICJpbXBvcnQgeyBDdXN0b21Nb2R1bGUgfSBmcm9tICcuLi8uLi9mdW5jdGlvbnMvcHJvY2Vzcy1wcm92aWRlcnMnO1xyXG5cclxuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi9lbnZpcm9ubWVudC9lbnZpcm9ubWVudC5zZXJ2aWNlJztcclxuXHJcbkBDdXN0b21Nb2R1bGUoe1xyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgcHJvdmlkZTogTE9DQUxfQ09ORklHLFxyXG4gICAgICAgIC8vICAgdXNlVmFsdWU6IHNoYXJlZENvbmZpZyxcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIEVudmlyb25tZW50U2VydmljZSxcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50TW9kdWxlIHt9XHJcbiIsICJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbkBNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgUG9zdGNzc01vZHVsZSB7fVxuIiwgImltcG9ydCB7IFV0aWxpdGllc01vZHVsZSB9IGZyb20gJy4vdXRpbGl0aWVzL3V0aWxpdGllcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBFbnZpcm9ubWVudE1vZHVsZSB9IGZyb20gJy4vZW52aXJvbm1lbnQvZW52aXJvbm1lbnQubW9kdWxlJztcclxuaW1wb3J0IHsgQ3VzdG9tTW9kdWxlIH0gZnJvbSAnLi4vZnVuY3Rpb25zL3Byb2Nlc3MtcHJvdmlkZXJzJztcclxuaW1wb3J0IHsgUG9zdGNzc01vZHVsZSB9IGZyb20gJy4vcG9zdGNzcy9wb3N0Y3NzLm1vZHVsZSc7XG5cclxuQEN1c3RvbU1vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbVXRpbGl0aWVzTW9kdWxlLCBFbnZpcm9ubWVudE1vZHVsZSwgUG9zdGNzc01vZHVsZV0sXHJcbiAgICBwcm92aWRlcnM6IFtdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9kdWxlc01vZHVsZSB7fVxyXG4iLCAiaW1wb3J0IHsgVml0ZUJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vVml0ZS1iYXNlL1ZpdGUtYmFzZS5zZXJ2aWNlJztcclxuXHJcblxyXG5pbXBvcnQgeyBDdXN0b21JbmplY3QsIEN1c3RvbUluamVjdGFibGUgfSBmcm9tICcjc2hhcmVkL3NyYy9mdW5jdGlvbnMvcHJvY2Vzcy1wcm92aWRlcnMnO1xyXG5pbXBvcnQgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IFZpdGVTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vdml0ZS1zaGFyZWQvdml0ZS1zaGFyZWQuc2VydmljZSc7XHJcblxyXG5AQ3VzdG9tSW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXRlUHJvZFNlcnZpY2UgZXh0ZW5kcyBWaXRlQmFzZVNlcnZpY2Uge1xyXG4gICAgQEN1c3RvbUluamVjdChWaXRlU2hhcmVkU2VydmljZSlcclxuICAgIHByb3RlY3RlZCB2aXRlU2hhcmVkU2VydmljZTogVml0ZVNoYXJlZFNlcnZpY2U7XHJcblxyXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbihvcHRpb25zPzpVc2VyQ29uZmlnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVyZ2VTZXJ2aWNlLm1lcmdlT3B0aW9ucyhcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ29uZmlndXJhdGlvbigpLFxyXG4gICAgICAgICAgICB0aGlzLnZpdGVTaGFyZWRTZXJ2aWNlLmNyZWF0ZUNvbmZpZ3VyYXRpb24oKSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW9kZToncHJvZHVjdGlvbidcclxuICAgICAgICAgICAgfSBhcyBVc2VyQ29uZmlnLFxyXG4gICAgICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTWFueUNvbmZpZ3VyYXRpb25zKCl7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG59XHJcbiIsICJpbXBvcnQgeyBDdXN0b21Nb2R1bGUgfSBmcm9tIFwiLi4vZnVuY3Rpb25zL3Byb2Nlc3MtcHJvdmlkZXJzXCI7XHJcbmltcG9ydCB7IE1vZHVsZXNNb2R1bGUgfSBmcm9tIFwiLi4vbW9kdWxlcy9tb2R1bGVzLm1vZHVsZVwiO1xyXG5cclxuaW1wb3J0IHsgVml0ZUJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vdml0ZS1iYXNlL3ZpdGUtYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFZpdGVEZXZTZXJ2aWNlIH0gZnJvbSBcIi4vdml0ZS1kZXYvdml0ZS1kZXYuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBWaXRlUGx1Z2luc1NlcnZpY2UgfSBmcm9tIFwiLi92aXRlLXBsdWdpbnMvdml0ZS1wbHVnaW5zL3ZpdGUtcGx1Z2lucy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFZpdGVQcm9kU2VydmljZSB9IGZyb20gXCIuL3ZpdGUtcHJvZC92aXRlLXByb2Quc2VydmljZVwiO1xyXG5pbXBvcnQgeyBWaXRlU2hhcmVkU2VydmljZSB9IGZyb20gXCIuL3ZpdGUtc2hhcmVkL3ZpdGUtc2hhcmVkLnNlcnZpY2VcIjtcclxuXHJcbkBDdXN0b21Nb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW01vZHVsZXNNb2R1bGVdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgVml0ZVByb2RTZXJ2aWNlLFxyXG4gICAgICAgIFZpdGVEZXZTZXJ2aWNlLFxyXG4gICAgICAgIFZpdGVTaGFyZWRTZXJ2aWNlLFxyXG4gICAgICAgIFZpdGVCYXNlU2VydmljZSxcclxuICAgICAgICBWaXRlUGx1Z2luc1NlcnZpY2VcclxuICAgIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXRlTW9kdWxlIHt9XHJcbiIsICJpbXBvcnQgeyBOZXN0RmFjdG9yeSB9IGZyb20gJ0BuZXN0anMvY29yZSc7XHJcbmltcG9ydCB7IFZpdGVCYXNlU2VydmljZSB9IGZyb20gJy4vc3JjL3ZpdGUvdml0ZS1iYXNlL3ZpdGUtYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVml0ZU1vZHVsZSB9IGZyb20gJy4vc3JjL3ZpdGUvdml0ZS5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHsgV2VicGFja0Jhc2VTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvd2VicGFjay93ZWJwYWNrLWJhc2Uvd2VicGFjay1iYXNlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgV2VicGFja01vZHVsZSB9IGZyb20gJy4vc3JjL3dlYnBhY2svd2VicGFjay5tb2R1bGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZpdGVCYXNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpdGVNb2R1bGU6IHsgbmV3ICgpOiBWaXRlTW9kdWxlIH0sIHByaXZhdGUgc2VydmljZXM6IHsgbmV3ICgpOiBWaXRlQmFzZVNlcnZpY2UgfVtdKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaXRlQ29uZmlncyA9IHRoaXMuY3JlYXRlVml0ZUNvbmZpZ3MuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmJ1aWxkID0gdGhpcy5idWlsZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMud2F0Y2ggPSB0aGlzLndhdGNoLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY3JlYXRlVml0ZUNvbmZpZ3MoZW52Pywgb3B0aW9ucz8pIHtcclxuICAgICAgICBpZiAob3B0aW9ucz8ubW9kZSkge1xyXG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IG9wdGlvbnM/Lm1vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhcHAgPSBhd2FpdCBOZXN0RmFjdG9yeS5jcmVhdGUodGhpcy52aXRlTW9kdWxlKTtcclxuICAgICAgICBhd2FpdCBhcHAuaW5pdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5tYXAoKHNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3ZjID0gYXBwLmdldChzZXJ2aWNlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHN2Yy5jcmVhdGVDb25maWd1cmF0aW9uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkKCkge1xyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOVikge1xyXG4gICAgICAgICAgICAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29uZmlncyA9IGF3YWl0IHRoaXMuY3JlYXRlVml0ZUNvbmZpZ3MoKTtcclxuICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2F0Y2goKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XHJcbiAgICAgICAgICAgIChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWdzID0gYXdhaXQgdGhpcy5jcmVhdGVWaXRlQ29uZmlncygpO1xyXG4gICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCAiXHJcbmltcG9ydCB7IFZpdGVEZXZTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvdml0ZS92aXRlLWRldi92aXRlLWRldi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVml0ZU1vZHVsZSB9IGZyb20gJy4vc3JjL3ZpdGUvdml0ZS5tb2R1bGUnO1xyXG5cclxuXHJcbmltcG9ydCB7IFZpdGVCYXNlIH0gZnJvbSAnLi92aXRlLmJhc2UnO1xyXG5jb25zdCB2aXRlQmFzZSA9IG5ldyBWaXRlQmFzZShWaXRlTW9kdWxlLCBbVml0ZURldlNlcnZpY2VdKTtcclxuXHJcbnZpdGVCYXNlLmJ1aWxkKCk7XHJcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0FDQ0E7OztBQ0RPLHVCQUFpQjtBQUFBLEVBQ2I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBOzs7QUNMWDtBQUNBO0FBQ0E7QUFHQTs7O0FDVEE7QUFFTyxJQUFNLGNBQWMsVUFBVSxLQUFLOzs7QURGbkMsSUFBTSxlQUFlLE9BQU87QUFZbkMsaUNBQTJCLFdBQVc7QUFBQSxFQUNsQyxVQUFVLFlBQVk7QUFBQSxFQUN0QixVQUFVLFlBQVk7QUFBQSxFQUN0QixjQUFjLEtBQUssU0FBUztBQUFBLEVBQzVCLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLFlBQVk7QUFBQSxFQUNaLGdCQUFnQjtBQUFBLEVBQ2hCLGVBQWU7QUFBQSxFQUNmLGNBQWM7QUFBQSxFQUNkLG9CQUFvQjtBQUFBO0FBR2pCLElBQU0sZUFBZSxJQUFJO0FBRWhDLG9CQUFjO0FBQUEsRUFDVixhQUEyQixDQUFDLFlBQVksY0FBYyxpQkFBaUI7QUFBQSxN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
