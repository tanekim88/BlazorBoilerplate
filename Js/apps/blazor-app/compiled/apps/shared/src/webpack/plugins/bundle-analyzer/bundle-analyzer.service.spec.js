import { Test } from '@nestjs/testing';
import { WebpackWebpackBundleAnalyzerService } from './webpack-webpack-bundle-analyzer.service';
describe('WebpackWebpackBundleAnalyzerService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackWebpackBundleAnalyzerService],
        }).compile();
        service = module.get(WebpackWebpackBundleAnalyzerService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=bundle-analyzer.service.spec.js.map