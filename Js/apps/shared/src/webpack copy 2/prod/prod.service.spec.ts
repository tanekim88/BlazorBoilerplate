import { Test, TestingModule } from '@nestjs/testing';
import { WebpackProdService } from './webpack-prod.service';

describe('WebpackProdService', () => {
    let service: WebpackProdService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackProdService],
        }).compile();

        service = module.get<WebpackProdService>(WebpackProdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
