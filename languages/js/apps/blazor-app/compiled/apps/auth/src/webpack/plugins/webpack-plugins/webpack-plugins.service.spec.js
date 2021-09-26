import { Test } from '@nestjs/testing';
import { AuthWebpackPluginsConfigService } from './webpack-plugins.service';
describe('AuthWebpackPluginsConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackPluginsConfigService],
        }).compile();
        service = module.get(AuthWebpackPluginsConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-plugins.service.spec.js.map