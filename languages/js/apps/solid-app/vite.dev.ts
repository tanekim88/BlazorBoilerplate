

import { ViteBase } from '@projects/shared/vite.base';
import { SolidAppViteDevService } from './src/vite/vite-dev/vite-dev.service';
import { SolidAppViteModule } from './src/vite/vite.module';

const viteBase = new ViteBase(SolidAppViteModule, SolidAppViteDevService);

await viteBase.build();

