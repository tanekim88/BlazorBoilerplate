

import { ViteBase } from '#shared/vite.base';
import { AuthViteProdService } from './src/vite/vite-prod/vite-prod.service';
import { AuthViteModule } from './src/vite/vite.module';

const viteBase = new ViteBase(AuthViteModule, AuthViteProdService);

viteBase.build();

