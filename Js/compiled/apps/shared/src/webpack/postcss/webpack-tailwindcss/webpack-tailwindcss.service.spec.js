"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_tailwindcss_service_1 = require("./webpack-tailwindcss.service");
describe('WebpackTailwindcssService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_tailwindcss_service_1.WebpackTailwindcssService],
        }).compile();
        service = module.get(webpack_tailwindcss_service_1.WebpackTailwindcssService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-tailwindcss.service.spec.js.map