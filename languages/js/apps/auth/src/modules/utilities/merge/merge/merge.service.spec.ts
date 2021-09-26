import { Test, TestingModule } from '@nestjs/testing';
import { AuthMergeService } from './merge.service';

describe('AuthMergeService', () => {
    let service: AuthMergeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthMergeService],
        }).compile();

        service = module.get<AuthMergeService>(AuthMergeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
