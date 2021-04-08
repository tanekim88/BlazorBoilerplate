"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_postcss_font_magician_service_1 = require("./webpack-postcss-font-magician.service");
describe('WebpackPostcssFontMagicianService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_postcss_font_magician_service_1.WebpackPostcssFontMagicianService],
        }).compile();
        service = module.get(webpack_postcss_font_magician_service_1.WebpackPostcssFontMagicianService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-postcss-font-magician.service.spec.js.map