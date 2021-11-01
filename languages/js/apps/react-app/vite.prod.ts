

import { ViteBase } from '#shared/vite.base';
import { ReactAppViteProdService } from './src/vite/vite-prod/vite-prod.service';
import { ReactAppViteModule } from './src/vite/vite.module';

const viteBase = new ViteBase(ReactAppViteModule, ReactAppViteProdService);

viteBase.build();

