import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssRfsAutopilotService } from './webpack-postcss-rfs-autopilot.service';

describe('WebpackPostcssRfsAutopilotService', () => {
    let service: WebpackPostcssRfsAutopilotService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssRfsAutopilotService],
        }).compile();

        service = module.get<WebpackPostcssRfsAutopilotService>(WebpackPostcssRfsAutopilotService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
