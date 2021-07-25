import { Test } from '@nestjs/testing';
import { WebpackRfsService } from './webpack-rfs.service';
describe('WebpackRfsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackRfsService],
        }).compile();
        service = module.get(WebpackRfsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-rfs.service.spec.js.map