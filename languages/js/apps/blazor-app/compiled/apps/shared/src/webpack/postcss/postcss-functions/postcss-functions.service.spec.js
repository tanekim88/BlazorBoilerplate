import { Test } from '@nestjs/testing';
import { WebpackPostcssFunctionsService } from './webpack-postcss-functions.service';
describe('WebpackPostcssFunctionsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssFunctionsService],
        }).compile();
        service = module.get(WebpackPostcssFunctionsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-functions.service.spec.js.map