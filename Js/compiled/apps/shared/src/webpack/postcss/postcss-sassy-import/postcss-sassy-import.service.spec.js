import { Test } from '@nestjs/testing';
import { WebpackPostcssSassyImportService } from './webpack-postcss-sassy-import.service';
describe('WebpackPostcssSassyImportService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssSassyImportService],
        }).compile();
        service = module.get(WebpackPostcssSassyImportService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-sassy-import.service.spec.js.map