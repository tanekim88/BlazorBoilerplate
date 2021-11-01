import { Test, TestingModule } from '@nestjs/testing';
import { ReactAppMergeService } from './merge.service';

describe('ReactAppMergeService', () => {
    let service: ReactAppMergeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReactAppMergeService],
        }).compile();

        service = module.get<ReactAppMergeService>(ReactAppMergeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
