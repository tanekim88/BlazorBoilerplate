import { Test, TestingModule } from '@nestjs/testing';
import { SolidAppMergeService } from './merge.service';

describe('SolidAppMergeService', () => {
    let service: SolidAppMergeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SolidAppMergeService],
        }).compile();

        service = module.get<SolidAppMergeService>(SolidAppMergeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
