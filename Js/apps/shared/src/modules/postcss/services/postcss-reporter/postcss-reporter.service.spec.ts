import { Test, TestingModule } from '@nestjs/testing';
import { PostcssReporterService } from './postcss-reporter.service';

describe('PostcssReporterService', () => {
    let service: PostcssReporterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssReporterService],
        }).compile();

        service = module.get<PostcssReporterService>(PostcssReporterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
