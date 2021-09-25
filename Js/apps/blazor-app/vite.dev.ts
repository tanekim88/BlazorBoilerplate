

import { ViteBase } from '#shared/vite.base';
import { BlazorAppViteDevService } from './src/vite/vite-dev/vite-dev.service';
import { BlazorAppViteModule } from './src/vite/vite.module';

const viteBase = new ViteBase(BlazorAppViteModule, BlazorAppViteDevService);

const watcher = await viteBase.build();


console.dir(watcher)