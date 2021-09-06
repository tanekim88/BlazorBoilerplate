import { Test } from '@nestjs/testing';
import { SolidAppWebpackSharedConfigService } from './webpack-shared-config.service';
describe('SolidAppWebpackSharedConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackSharedConfigService],
        }).compile();
        service = module.get(SolidAppWebpackSharedConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared-config.service.spec.js.map