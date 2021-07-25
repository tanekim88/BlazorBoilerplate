import { Test } from '@nestjs/testing';
import { WebpackWebpackPwaManifestService } from './webpack-webpack-pwa-manifest.service';
describe('WebpackWebpackPwaManifestService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackWebpackPwaManifestService],
        }).compile();
        service = module.get(WebpackWebpackPwaManifestService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-pwa-manifest.service.spec.js.map