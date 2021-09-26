import { ViteBase } from '@projects/shared/vite.base';
import { BlazorAppViteDevService } from './src/vite/vite-dev/vite-dev.service';
import { BlazorAppViteModule } from './src/vite/vite.module';
const viteBase = new ViteBase(BlazorAppViteModule, BlazorAppViteDevService);
await viteBase.build();
//# sourceMappingURL=vite.dev.js.map