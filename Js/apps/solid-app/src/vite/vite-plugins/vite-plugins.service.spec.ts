import { Test, TestingModule } from '@nestjs/testing';
import { SolidAppVitePluginsService } from './vite-plugins.service';

describe('SolidAppVitePluginsService', () => {
    let service: SolidAppVitePluginsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SolidAppVitePluginsService],
        }).compile();

        service = module.get<SolidAppVitePluginsService>(SolidAppVitePluginsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
