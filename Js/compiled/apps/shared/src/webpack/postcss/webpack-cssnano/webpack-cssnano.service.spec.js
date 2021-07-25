import { Test } from '@nestjs/testing';
import { WebpackCssnanoService } from './webpack-cssnano.service';
describe('WebpackCssnanoService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackCssnanoService],
        }).compile();
        service = module.get(WebpackCssnanoService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-cssnano.service.spec.js.map