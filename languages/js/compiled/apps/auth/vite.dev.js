import { ViteBase } from '#shared/vite.base';
import { AuthViteDevService } from './src/vite/vite-dev/vite-dev.service';
import { AuthViteModule } from './src/vite/vite.module';
const viteBase = new ViteBase(AuthViteModule, AuthViteDevService);
await viteBase.build();
//# sourceMappingURL=vite.dev.js.map