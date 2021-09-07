import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppMergeService } from './merge.service';

describe('BlazorAppMergeService', () => {
    let service: BlazorAppMergeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppMergeService],
        }).compile();

        service = module.get<BlazorAppMergeService>(BlazorAppMergeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
