import { Test, TestingModule } from '@nestjs/testing';
import { WebpackErrorHandlerPluginService } from './webpack-error-handler-plugin.service';

describe('WebpackErrorHandlerPluginService', () => {
    let service: WebpackErrorHandlerPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackErrorHandlerPluginService],
        }).compile();

        service = module.get<WebpackErrorHandlerPluginService>(WebpackErrorHandlerPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
