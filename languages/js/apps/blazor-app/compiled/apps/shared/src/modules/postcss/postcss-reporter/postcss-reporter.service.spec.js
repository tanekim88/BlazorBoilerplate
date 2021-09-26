import { Test } from '@nestjs/testing';
import { PostcssReporterService } from './postcss-reporter.service';
describe('PostcssReporterService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssReporterService],
        }).compile();
        service = module.get(PostcssReporterService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-reporter.service.spec.js.map