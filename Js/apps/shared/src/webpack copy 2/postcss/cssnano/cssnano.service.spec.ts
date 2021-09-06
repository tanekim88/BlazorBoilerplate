import { Test, TestingModule } from '@nestjs/testing';
import { WebpackCssnanoService } from './webpack-cssnano.service';

describe('WebpackCssnanoService', () => {
    let service: WebpackCssnanoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackCssnanoService],
        }).compile();

        service = module.get<WebpackCssnanoService>(WebpackCssnanoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
