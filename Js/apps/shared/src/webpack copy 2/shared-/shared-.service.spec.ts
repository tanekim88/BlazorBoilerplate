import { Test, TestingModule } from '@nestjs/testing';
import { WebpackSharedBaseService } from './webpack-shared-base.service';

describe('WebpackSharedBaseService', () => {
    let service: WebpackSharedBaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackSharedBaseService],
        }).compile();

        service = module.get<WebpackSharedBaseService>(WebpackSharedBaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
