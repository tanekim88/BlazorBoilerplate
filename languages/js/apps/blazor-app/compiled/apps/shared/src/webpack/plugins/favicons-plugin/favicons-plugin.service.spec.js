import { Test } from '@nestjs/testing';
import { WebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin.service';
describe('WebpackFaviconsWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackFaviconsWebpackPluginService],
        }).compile();
        service = module.get(WebpackFaviconsWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=favicons-plugin.service.spec.js.map