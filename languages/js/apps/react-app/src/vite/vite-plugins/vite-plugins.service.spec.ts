import { Test, TestingModule } from '@nestjs/testing';
import { ReactAppVitePluginsService } from './vite-plugins.service';

describe('ReactAppVitePluginsService', () => {
    let service: ReactAppVitePluginsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReactAppVitePluginsService],
        }).compile();

        service = module.get<ReactAppVitePluginsService>(ReactAppVitePluginsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
