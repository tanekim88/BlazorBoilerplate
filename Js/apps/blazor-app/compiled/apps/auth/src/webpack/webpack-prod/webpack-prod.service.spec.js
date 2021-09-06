import { Test } from '@nestjs/testing';
import { AuthWebpackProdService } from './webpack-prod.service';
describe('AuthWebpackProdService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackProdService],
        }).compile();
        service = module.get(AuthWebpackProdService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-prod.service.spec.js.map