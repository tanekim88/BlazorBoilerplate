import { Test } from '@nestjs/testing';
import { WebpackMinimizersService } from './webpack-minimizers.service';
describe('WebpackMinimizersService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackMinimizersService],
        }).compile();
        service = module.get(WebpackMinimizersService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=minimizers.service.spec.js.map