import { Test } from '@nestjs/testing';
import { AuthWebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin.service';
describe('AuthWebpackCleanWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackCleanWebpackPluginService],
        }).compile();
        service = module.get(AuthWebpackCleanWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-clean-webpack-plugin.service.spec.js.map