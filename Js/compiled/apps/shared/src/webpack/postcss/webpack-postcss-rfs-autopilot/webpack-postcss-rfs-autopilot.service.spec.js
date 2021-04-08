"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_rfs_autopilot_service_1 = require("./webpack-postcss-rfs-autopilot.service");
describe('WebpackPostcssRfsAutopilotService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_rfs_autopilot_service_1.WebpackPostcssRfsAutopilotService],
        }).compile();
        service = module.get(webpack_postcss_rfs_autopilot_service_1.WebpackPostcssRfsAutopilotService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-rfs-autopilot.service.spec.js.map