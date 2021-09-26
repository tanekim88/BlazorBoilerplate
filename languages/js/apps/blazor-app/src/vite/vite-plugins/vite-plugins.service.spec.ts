import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppVitePluginsService } from './vite-plugins.service';

describe('BlazorAppVitePluginsService', () => {
    let service: BlazorAppVitePluginsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppVitePluginsService],
        }).compile();

        service = module.get<BlazorAppVitePluginsService>(BlazorAppVitePluginsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
