import { Test } from '@nestjs/testing';
import { WebpackProvidePluginService } from './webpack-provide-plugin.service';
describe('WebpackProvidePluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackProvidePluginService],
        }).compile();
        service = module.get(WebpackProvidePluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-provide-plugin.service.spec.js.map