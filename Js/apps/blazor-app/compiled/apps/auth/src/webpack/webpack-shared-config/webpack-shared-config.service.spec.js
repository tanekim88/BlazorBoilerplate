import { Test } from '@nestjs/testing';
import { AuthWebpackSharedConfigService } from './webpack-shared-config.service';
describe('AuthWebpackSharedConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackSharedConfigService],
        }).compile();
        service = module.get(AuthWebpackSharedConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared-config.service.spec.js.map