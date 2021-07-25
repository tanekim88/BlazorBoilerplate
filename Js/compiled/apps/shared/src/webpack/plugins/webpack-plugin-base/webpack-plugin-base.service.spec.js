import { Test } from '@nestjs/testing';
import { WebpackPluginBaseService } from './webpack-plugin-base.service';
describe('WebpackPluginBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPluginBaseService],
        }).compile();
        service = module.get(WebpackPluginBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-plugin-base.service.spec.js.map