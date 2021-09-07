import { ConfigBase } from '#shared/configs.base';
import { solidAppPaths } from './paths';

export class BlazorAppConfig extends ConfigBase {
    rootDir = solidAppPaths.toAbsolutePath();
    RootDir = solidAppPaths.toAbsolutePath();
    projectName = 'solidrApp';
    title = 'App title';
    name = 'App name';
    shortName = 'App short name';
    developerName = 'Tane Kim';
    developerUrl = 'www.taneware.com';
    description = 'app desc';
}

export const blazorAppConfig = new BlazorAppConfig();
