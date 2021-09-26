import { Test } from '@nestjs/testing';
import { WebpackSharedConfigService } from './webpack-shared-config.service';
describe('WebpackSharedConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackSharedConfigService],
        }).compile();
        service = module.get(WebpackSharedConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=shared-config.service.spec.js.map