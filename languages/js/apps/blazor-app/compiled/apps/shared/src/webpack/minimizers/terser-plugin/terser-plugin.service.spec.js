import { Test } from '@nestjs/testing';
import { WebpackTerserPluginService } from './webpack-terser-plugin.service';
describe('WebpackTerserPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackTerserPluginService],
        }).compile();
        service = module.get(WebpackTerserPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=terser-plugin.service.spec.js.map