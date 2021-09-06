import { Test, TestingModule } from '@nestjs/testing';
import { PostcssRfsAutopilotService } from './postcss-rfs-autopilot.service';

describe('PostcssRfsAutopilotService', () => {
    let service: PostcssRfsAutopilotService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssRfsAutopilotService],
        }).compile();

        service = module.get<PostcssRfsAutopilotService>(PostcssRfsAutopilotService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
