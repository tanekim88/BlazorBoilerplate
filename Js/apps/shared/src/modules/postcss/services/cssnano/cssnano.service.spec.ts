import { Test, TestingModule } from '@nestjs/testing';
import { CssnanoService } from './cssnano.service';

describe('CssnanoService', () => {
    let service: CssnanoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CssnanoService],
        }).compile();

        service = module.get<CssnanoService>(CssnanoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
