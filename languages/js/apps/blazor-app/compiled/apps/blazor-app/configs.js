import { ConfigBase } from '@projects/shared/configs.base';
import { blazorAppPaths } from './paths';
export class BlazorAppConfig extends ConfigBase {
    rootDir = blazorAppPaths.toAbsolutePath();
    RootDir = blazorAppPaths.toAbsolutePath();
    projectName = 'BlazorApp';
    title = 'App title';
    name = 'App name';
    shortName = 'App short name';
    developerName = 'Tane Kim';
    developerUrl = 'www.taneware.com';
    description = 'app desc';
}
export const BlazorAppConfig = new BlazorAppConfig();
//# sourceMappingURL=configs.js.map