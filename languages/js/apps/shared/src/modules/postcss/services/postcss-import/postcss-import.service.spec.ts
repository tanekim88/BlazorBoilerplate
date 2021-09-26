import { Test, TestingModule } from '@nestjs/testing';
import { PostcssImportService } from './postcss-import.service';

describe('PostcssImportService', () => {
    let service: PostcssImportService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssImportService],
        }).compile();

        service = module.get<PostcssImportService>(PostcssImportService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
