

import { ViteBase } from '#shared/vite.base';
import { ReactAppViteDevService } from './src/vite/vite-dev/vite-dev.service';
import { ReactAppViteModule } from './src/vite/vite.module';

const viteBase = new ViteBase(ReactAppViteModule, ReactAppViteDevService);

await viteBase.build();

