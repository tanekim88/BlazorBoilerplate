import { Test, TestingModule } from '@nestjs/testing';
import { WebpackMinimizersService } from './webpack-minimizers.service';

describe('WebpackMinimizersService', () => {
    let service: WebpackMinimizersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackMinimizersService],
        }).compile();

        service = module.get<WebpackMinimizersService>(WebpackMinimizersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
