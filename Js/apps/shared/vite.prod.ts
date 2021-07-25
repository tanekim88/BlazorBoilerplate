
import { ViteProdService } from './src/vite/vite-prod/vite-prod.service';
import { ViteModule } from './src/vite/vite.module';


import { ViteBase } from './vite.base';
const viteBase = new ViteBase(ViteModule, [ViteProdService]);

viteBase.build();

