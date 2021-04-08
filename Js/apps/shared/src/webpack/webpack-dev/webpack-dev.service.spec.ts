import { Test, TestingModule } from '@nestjs/testing';
import { WebpackDevService } from './webpack-dev.service';

describe('WebpackDevService', () => {
    let service: WebpackDevService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackDevService],
        }).compile();

        service = module.get<WebpackDevService>(WebpackDevService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
