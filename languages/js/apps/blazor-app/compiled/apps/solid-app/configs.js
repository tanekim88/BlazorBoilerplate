import { ConfigBase } from '@projects/shared/configs.base';
import { BlazorAppPaths, blazorAppPaths } from './paths';
export class BlazorAppConfig extends ConfigBase {
    rootDir = blazorAppPaths.toAbsolutePath();
    RootDir = BlazorAppPaths.toAbsolutePath();
    projectName = 'blazorApp';
    title = 'App title';
    name = 'App name';
    shortName = 'App short name';
    developerName = 'Tane Kim';
    developerUrl = 'www.taneware.com';
    description = 'app desc';
}
export const blazorAppConfig = new BlazorAppConfig();
//# sourceMappingURL=configs.js.map