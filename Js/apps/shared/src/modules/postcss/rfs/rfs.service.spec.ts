import { Test, TestingModule } from '@nestjs/testing';
import { RfsService } from './rfs.service';

describe('RfsService', () => {
    let service: RfsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RfsService],
        }).compile();

        service = module.get<RfsService>(RfsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
