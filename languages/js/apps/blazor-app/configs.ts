import { ConfigBase } from '#shared/configs.base';
import { blazorAppPaths, BlazorAppPaths } from './paths';

export class BlazorAppConfig extends ConfigBase {
    rootDir = blazorAppPaths.toAbsolutePath();
    RootDir = BlazorAppPaths.toAbsolutePath();
    projectName = 'BlazorApp';
    title = 'App title';
    name = 'App name';
    shortName = 'App short name';
    developerName = 'Tane Kim';
    developerUrl = 'www.taneware.com';
    description = 'app desc';
}

export const blazorAppConfig = new BlazorAppConfig();
