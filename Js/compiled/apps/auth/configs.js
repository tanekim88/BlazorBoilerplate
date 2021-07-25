import { ConfigBase } from '@shared/configs.base';
import { authPaths, AuthPaths } from './paths';
export class AuthConfig extends ConfigBase {
    constructor() {
        super(...arguments);
        this.rootDir = authPaths.toAbsolutePath();
        this.RootDir = AuthPaths.toAbsolutePath();
        this.projectName = 'Auth';
        this.title = 'App title';
        this.name = 'App name';
        this.shortName = 'App short name';
        this.developerName = 'Tane Kim';
        this.developerUrl = 'www.taneware.com';
        this.description = 'app desc';
    }
}
export const authConfig = new AuthConfig();
//# sourceMappingURL=configs.js.map