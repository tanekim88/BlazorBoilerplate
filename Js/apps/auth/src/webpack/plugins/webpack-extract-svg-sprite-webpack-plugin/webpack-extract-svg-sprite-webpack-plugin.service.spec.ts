import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackExtractSvgSpriteWebpackPluginService } from './webpack-extract-svg-sprite-webpack-plugin.service';

describe('AuthWebpackExtractSvgSpriteWebpackPluginService', () => {
    let service: AuthWebpackExtractSvgSpriteWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackExtractSvgSpriteWebpackPluginService],
        }).compile();

        service = module.get<AuthWebpackExtractSvgSpriteWebpackPluginService>(
            AuthWebpackExtractSvgSpriteWebpackPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
