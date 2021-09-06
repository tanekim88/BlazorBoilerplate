import { Test } from '@nestjs/testing';
import { WebpackPostcssFontMagicianService } from './webpack-postcss-font-magician.service';
describe('WebpackPostcssFontMagicianService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssFontMagicianService],
        }).compile();
        service = module.get(WebpackPostcssFontMagicianService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-font-magician.service.spec.js.map