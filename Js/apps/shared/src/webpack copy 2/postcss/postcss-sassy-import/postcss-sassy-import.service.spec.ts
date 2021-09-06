import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssSassyImportService } from './webpack-postcss-sassy-import.service';

describe('WebpackPostcssSassyImportService', () => {
    let service: WebpackPostcssSassyImportService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssSassyImportService],
        }).compile();

        service = module.get<WebpackPostcssSassyImportService>(WebpackPostcssSassyImportService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
