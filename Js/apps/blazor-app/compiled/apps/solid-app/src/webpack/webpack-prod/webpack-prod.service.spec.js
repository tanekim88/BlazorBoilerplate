import { Test } from '@nestjs/testing';
import { SolidAppWebpackProdService } from './webpack-prod.service';
describe('SolidAppWebpackProdService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackProdService],
        }).compile();
        service = module.get(SolidAppWebpackProdService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-prod.service.spec.js.map