import { ViteBase } from '#shared/vite.base';
import { SolidAppViteProdService } from './src/vite/vite-prod/vite-prod.service';
import { SolidAppViteModule } from './src/vite/vite.module';
const viteBase = new ViteBase(SolidAppViteModule, SolidAppViteProdService);
viteBase.build();
//# sourceMappingURL=vite.prod.js.map