import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackWebpackFixStyleOnlyEntriesService } from './webpack-webpack-fix-style-only-entries.service';

describe('AuthWebpackWebpackFixStyleOnlyEntriesService', () => {
    let service: AuthWebpackWebpackFixStyleOnlyEntriesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackWebpackFixStyleOnlyEntriesService],
        }).compile();

        service = module.get<AuthWebpackWebpackFixStyleOnlyEntriesService>(
            AuthWebpackWebpackFixStyleOnlyEntriesService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
