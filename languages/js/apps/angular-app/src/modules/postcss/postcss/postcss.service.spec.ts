import { Test, TestingModule } from '@nestjs/testing';
import { AngularAppPostcssService } from './postcss.service';

describe('AngularAppPostcssService', () => {
    let service: AngularAppPostcssService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AngularAppPostcssService],
        }).compile();

        service = module.get<AngularAppPostcssService>(AngularAppPostcssService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
