import { Test } from '@nestjs/testing';
import { PostcssImportService } from './postcss-import.service';
describe('PostcssImportService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssImportService],
        }).compile();
        service = module.get(PostcssImportService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-import.service.spec.js.map