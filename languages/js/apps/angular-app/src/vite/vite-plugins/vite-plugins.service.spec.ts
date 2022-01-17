import { Test, TestingModule } from '@nestjs/testing';
import { AngularAppVitePluginsService } from './vite-plugins.service';

describe('AngularAppVitePluginsService', () => {
    let service: AngularAppVitePluginsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AngularAppVitePluginsService],
        }).compile();

        service = module.get<AngularAppVitePluginsService>(AngularAppVitePluginsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
