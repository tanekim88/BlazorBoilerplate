import { Test } from '@nestjs/testing';
import { WebpackBaseService } from './webpack-base.service';
describe('WebpackBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackBaseService],
        }).compile();
        service = module.get(WebpackBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=base.service.spec.js.map