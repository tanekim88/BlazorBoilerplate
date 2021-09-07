import { Test } from '@nestjs/testing';
import { BlazorAppWebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin.service';
describe('BlazorAppWebpackFaviconsWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackFaviconsWebpackPluginService],
        }).compile();
        service = module.get(BlazorAppWebpackFaviconsWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-favicons-webpack-plugin.service.spec.js.map