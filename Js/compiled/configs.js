import { ConfigBase } from '@shared/configs.base';
import path from 'path';
class RootConfig extends ConfigBase {
    constructor() {
        super(...arguments);
        this.rootDir = __dirname;
        this.projectName = path.basename(__dirname);
        this.name = '';
        this.title = '';
        this.shortName = '';
        this.developerName = '';
        this.developerUrl = '';
        this.description = '';
    }
}
export const rootConfig = new RootConfig();
//# sourceMappingURL=configs.js.map