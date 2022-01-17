

import { ViteBase } from '#shared/vite.base';
import { AngularAppViteDevService } from './src/vite/vite-dev/vite-dev.service';
import { AngularAppViteModule } from './src/vite/vite.module';

const viteBase = new ViteBase(AngularAppViteModule, AngularAppViteDevService);

await viteBase.build();

