import { Test } from '@nestjs/testing';
import { PostcssSassyImportService } from './postcss-sassy-import.service';
describe('PostcssSassyImportService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssSassyImportService],
        }).compile();
        service = module.get(PostcssSassyImportService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-sassy-import.service.spec.js.map