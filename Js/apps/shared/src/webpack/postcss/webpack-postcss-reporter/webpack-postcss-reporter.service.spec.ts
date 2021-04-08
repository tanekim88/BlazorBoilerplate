import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssReporterService } from './webpack-postcss-reporter.service';

describe('WebpackPostcssReporterService', () => {
    let service: WebpackPostcssReporterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssReporterService],
        }).compile();

        service = module.get<WebpackPostcssReporterService>(WebpackPostcssReporterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
