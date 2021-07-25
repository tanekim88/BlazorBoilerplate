import { ConfigBase } from '@shared/configs.base';
import { BlazorAppPaths, blazorAppPaths } from './paths';
export class BlazorAppConfig extends ConfigBase {
    constructor() {
        super(...arguments);
        this.rootDir = blazorAppPaths.toAbsolutePath();
        this.RootDir = BlazorAppPaths.toAbsolutePath();
        this.projectName = 'blazorApp';
        this.title = 'App title';
        this.name = 'App name';
        this.shortName = 'App short name';
        this.developerName = 'Tane Kim';
        this.developerUrl = 'www.taneware.com';
        this.description = 'app desc';
    }
}
export const blazorAppConfig = new BlazorAppConfig();
//# sourceMappingURL=configs.js.map