import { Test, TestingModule } from '@nestjs/testing';
import { PostcssSassyImportService } from './postcss-sassy-import.service';

describe('PostcssSassyImportService', () => {
    let service: PostcssSassyImportService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssSassyImportService],
        }).compile();

        service = module.get<PostcssSassyImportService>(PostcssSassyImportService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
