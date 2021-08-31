import { ConfigBase } from '@shared/configs.base';
import { authPaths, AuthPaths } from './paths';
export class AuthConfig extends ConfigBase {
    rootDir = authPaths.toAbsolutePath();
    RootDir = AuthPaths.toAbsolutePath();
    projectName = 'Auth';
    title = 'App title';
    name = 'App name';
    shortName = 'App short name';
    developerName = 'Tane Kim';
    developerUrl = 'www.taneware.com';
    description = 'app desc';
}
export const authConfig = new AuthConfig();
//# sourceMappingURL=configs.js.map