import { Test } from '@nestjs/testing';
import { BlazorAppWebpackSharedConfigService } from './webpack-shared-config.service';
describe('BlazorAppWebpackSharedConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackSharedConfigService],
        }).compile();
        service = module.get(BlazorAppWebpackSharedConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared-config.service.spec.js.map