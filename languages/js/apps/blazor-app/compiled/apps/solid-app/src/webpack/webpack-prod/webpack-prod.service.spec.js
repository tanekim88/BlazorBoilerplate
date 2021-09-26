import { Test } from '@nestjs/testing';
import { BlazorAppWebpackProdService } from './webpack-prod.service';
describe('BlazorAppWebpackProdService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackProdService],
        }).compile();
        service = module.get(BlazorAppWebpackProdService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-prod.service.spec.js.map