import { Test } from '@nestjs/testing';
import { BlazorAppWebpackSharedService } from './webpack-shared.service';
describe('BlazorAppWebpackSharedService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackSharedService],
        }).compile();
        service = module.get(BlazorAppWebpackSharedService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared.service.spec.js.map