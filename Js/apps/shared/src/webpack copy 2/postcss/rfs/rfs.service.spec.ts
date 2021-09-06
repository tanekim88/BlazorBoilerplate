import { Test, TestingModule } from '@nestjs/testing';
import { WebpackRfsService } from './webpack-rfs.service';

describe('WebpackRfsService', () => {
    let service: WebpackRfsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackRfsService],
        }).compile();

        service = module.get<WebpackRfsService>(WebpackRfsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
