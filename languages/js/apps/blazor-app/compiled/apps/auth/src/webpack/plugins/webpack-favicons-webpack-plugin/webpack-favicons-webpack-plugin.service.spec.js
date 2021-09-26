import { Test } from '@nestjs/testing';
import { AuthWebpackFaviconsWebpackPluginService } from './webpack-favicons-webpack-plugin.service';
describe('AuthWebpackFaviconsWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackFaviconsWebpackPluginService],
        }).compile();
        service = module.get(AuthWebpackFaviconsWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-favicons-webpack-plugin.service.spec.js.map