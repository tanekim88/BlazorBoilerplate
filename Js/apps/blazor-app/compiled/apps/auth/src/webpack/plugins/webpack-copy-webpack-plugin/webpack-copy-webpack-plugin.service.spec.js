import { Test } from '@nestjs/testing';
import { AuthWebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin.service';
describe('AuthWebpackCopyWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackCopyWebpackPluginService],
        }).compile();
        service = module.get(AuthWebpackCopyWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-copy-webpack-plugin.service.spec.js.map