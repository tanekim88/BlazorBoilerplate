import { Test, TestingModule } from '@nestjs/testing';
import { AngularAppMergeService } from './merge.service';

describe('AngularAppMergeService', () => {
    let service: AngularAppMergeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AngularAppMergeService],
        }).compile();

        service = module.get<AngularAppMergeService>(AngularAppMergeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
