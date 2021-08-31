import { Test } from '@nestjs/testing';
import { WebpackPostcssReporterService } from './webpack-postcss-reporter.service';
describe('WebpackPostcssReporterService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssReporterService],
        }).compile();
        service = module.get(WebpackPostcssReporterService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-reporter.service.spec.js.map