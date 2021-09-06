import { Test, TestingModule } from '@nestjs/testing';
import { WebpackBaseService } from './webpack-base.service';

describe('WebpackBaseService', () => {
    let service: WebpackBaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackBaseService],
        }).compile();

        service = module.get<WebpackBaseService>(WebpackBaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
