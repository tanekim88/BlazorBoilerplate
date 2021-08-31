import { ConfigBase } from '#shared/configs.base';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
