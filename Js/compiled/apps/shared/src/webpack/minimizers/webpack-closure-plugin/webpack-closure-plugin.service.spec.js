import { Test } from '@nestjs/testing';
import { WebpackClosureWebpackPluginService } from './webpack-closure-plugin.service';
describe('WebpackClosureWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackClosureWebpackPluginService],
        }).compile();
        service = module.get(WebpackClosureWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-closure-plugin.service.spec.js.map