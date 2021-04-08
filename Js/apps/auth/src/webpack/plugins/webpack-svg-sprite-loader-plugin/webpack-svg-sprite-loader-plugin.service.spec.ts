import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackSvgSpriteLoaderPluginService } from './webpack-svg-sprite-loader-plugin.service';

describe('AuthWebpackSvgSpriteLoaderPluginService', () => {
    let service: AuthWebpackSvgSpriteLoaderPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackSvgSpriteLoaderPluginService],
        }).compile();

        service = module.get<AuthWebpackSvgSpriteLoaderPluginService>(
            AuthWebpackSvgSpriteLoaderPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
