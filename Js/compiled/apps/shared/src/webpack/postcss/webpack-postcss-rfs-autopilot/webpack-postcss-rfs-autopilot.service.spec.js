import { Test } from '@nestjs/testing';
import { WebpackPostcssRfsAutopilotService } from './webpack-postcss-rfs-autopilot.service';
describe('WebpackPostcssRfsAutopilotService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssRfsAutopilotService],
        }).compile();
        service = module.get(WebpackPostcssRfsAutopilotService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-rfs-autopilot.service.spec.js.map