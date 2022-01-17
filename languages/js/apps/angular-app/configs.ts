import { ConfigBase } from '#shared/configs.base';
import { angularAppPaths } from './paths';

export class AngularAppConfig extends ConfigBase {
    rootDir = angularAppPaths.toAbsolutePath();
    RootDir = angularAppPaths.toAbsolutePath();
    projectName = 'solidrApp';
    title = 'App title';
    name = 'App name';
    shortName = 'App short name';
    developerName = 'Tane Kim';
    developerUrl = 'www.taneware.com';
    description = 'app desc';
}

export const angularAppConfig = new AngularAppConfig();
