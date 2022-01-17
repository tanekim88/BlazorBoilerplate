

import { ViteBase } from '#shared/vite.base';
import { AngularAppViteProdService } from './src/vite/vite-prod/vite-prod.service';
import { AngularAppViteModule } from './src/vite/vite.module';

const viteBase = new ViteBase(AngularAppViteModule, AngularAppViteProdService);

viteBase.build();

