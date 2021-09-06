import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssImportService } from './webpack-postcss-import.service';

describe('WebpackPostcssImportService', () => {
    let service: WebpackPostcssImportService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssImportService],
        }).compile();

        service = module.get<WebpackPostcssImportService>(WebpackPostcssImportService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
