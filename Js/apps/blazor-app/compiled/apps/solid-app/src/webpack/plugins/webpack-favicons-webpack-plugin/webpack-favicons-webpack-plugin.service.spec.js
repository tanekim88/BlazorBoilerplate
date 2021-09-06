import { Test } from '@nestjs/testing';
import { SolidAppWebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin.service';
describe('SolidAppWebpackFaviconsWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackFaviconsWebpackPluginService],
        }).compile();
        service = module.get(SolidAppWebpackFaviconsWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-favicons-webpack-plugin.service.spec.js.map