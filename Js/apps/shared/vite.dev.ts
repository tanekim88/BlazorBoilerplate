
import { ViteDevService } from './src/vite/vite-dev/vite-dev.service';
import { ViteModule } from './src/vite/vite.module';


import { ViteBase } from './vite.base';
const viteBase = new ViteBase(ViteModule, ViteDevService);

await viteBase.build();

