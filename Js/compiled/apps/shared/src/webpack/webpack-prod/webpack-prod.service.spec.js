import { Test } from '@nestjs/testing';
import { WebpackProdService } from './webpack-prod.service';
describe('WebpackProdService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackProdService],
        }).compile();
        service = module.get(WebpackProdService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-prod.service.spec.js.map