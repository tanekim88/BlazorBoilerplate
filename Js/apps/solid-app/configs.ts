import { ConfigBase } from '#shared/configs.base';
import { solidAppPaths } from './paths';

export class SolidAppConfig extends ConfigBase {
    rootDir = solidAppPaths.toAbsolutePath();
    RootDir = solidAppPaths.toAbsolutePath();
    projectName = 'blazorApp';
    title = 'App title';
    name = 'App name';
    shortName = 'App short name';
    developerName = 'Tane Kim';
    developerUrl = 'www.taneware.com';
    description = 'app desc';
}

export const blazorAppConfig = new SolidAppConfig();
