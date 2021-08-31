import { Test } from '@nestjs/testing';
import { WebpackPostcssImportService } from './webpack-postcss-import.service';
describe('WebpackPostcssImportService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssImportService],
        }).compile();
        service = module.get(WebpackPostcssImportService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-import.service.spec.js.map