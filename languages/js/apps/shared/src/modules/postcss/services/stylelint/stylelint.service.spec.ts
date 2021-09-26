import { Test, TestingModule } from '@nestjs/testing';
import { StylelintService } from './stylelint.service';

describe('StylelintService', () => {
    let service: StylelintService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StylelintService],
        }).compile();

        service = module.get<StylelintService>(StylelintService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
