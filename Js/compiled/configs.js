import { ConfigBase } from '@shared/configs.base';
import path from 'path';
class RootConfig extends ConfigBase {
    rootDir = __dirname;
    projectName = path.basename(__dirname);
    name = '';
    title = '';
    shortName = '';
    developerName = '';
    developerUrl = '';
    description = '';
}
export const rootConfig = new RootConfig();
//# sourceMappingURL=configs.js.map