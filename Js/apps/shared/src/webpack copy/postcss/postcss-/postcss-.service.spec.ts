import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssBaseService } from './webpack-postcss-base.service';

describe('WebpackPostcssBaseService', () => {
    let service: WebpackPostcssBaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssBaseService],
        }).compile();

        service = module.get<WebpackPostcssBaseService>(WebpackPostcssBaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
