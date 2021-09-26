import { Test } from '@nestjs/testing';
import { PostcssRfsAutopilotService } from './postcss-rfs-autopilot.service';
describe('PostcssRfsAutopilotService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssRfsAutopilotService],
        }).compile();
        service = module.get(PostcssRfsAutopilotService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-rfs-autopilot.service.spec.js.map