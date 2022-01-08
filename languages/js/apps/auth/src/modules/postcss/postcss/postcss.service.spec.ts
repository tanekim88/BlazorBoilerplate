import { Test, TestingModule } from '@nestjs/testing';
import { AuthPostcssService } from './postcss.service';

describe('AuthPostcssService', () => {
    let service: AuthPostcssService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthPostcssService],
        }).compile();

        service = module.get<AuthPostcssService>(AuthPostcssService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
