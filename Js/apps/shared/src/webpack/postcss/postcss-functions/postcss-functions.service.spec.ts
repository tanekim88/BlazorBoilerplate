import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssFunctionsService } from './webpack-postcss-functions.service';

describe('WebpackPostcssFunctionsService', () => {
    let service: WebpackPostcssFunctionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssFunctionsService],
        }).compile();

        service = module.get<WebpackPostcssFunctionsService>(WebpackPostcssFunctionsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
