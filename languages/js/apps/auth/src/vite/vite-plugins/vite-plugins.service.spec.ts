import { Test, TestingModule } from '@nestjs/testing';
import { AuthVitePluginsService } from './vite-plugins.service';

describe('AuthVitePluginsService', () => {
    let service: AuthVitePluginsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthVitePluginsService],
        }).compile();

        service = module.get<AuthVitePluginsService>(AuthVitePluginsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
