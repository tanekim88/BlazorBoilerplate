import { Test } from '@nestjs/testing';
import { PostcssAdvancedVariablesService } from './postcss-advanced-variables.service';
describe('PostcssAdvancedVariablesService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssAdvancedVariablesService],
        }).compile();
        service = module.get(PostcssAdvancedVariablesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-advanced-variables.service.spec.js.map