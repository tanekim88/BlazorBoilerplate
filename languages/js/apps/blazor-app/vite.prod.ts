

import { ViteBase } from '#shared/vite.base';
import { BlazorAppViteProdService } from './src/vite/vite-prod/vite-prod.service';
import { BlazorAppViteModule } from './src/vite/vite.module';

const viteBase = new ViteBase(BlazorAppViteModule, BlazorAppViteProdService);

viteBase.build();

