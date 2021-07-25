import { Test } from '@nestjs/testing';
import { WebpackCssMinimizerPluginService } from './webpack-css-minimizer-plugin.service';
describe('WebpackCssMinimizerPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackCssMinimizerPluginService],
        }).compile();
        service = module.get(WebpackCssMinimizerPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-css-minimizer-plugin.service.spec.js.map