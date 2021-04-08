"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_image_rules_service_1 = require("./webpack-image-rules.service");
describe('BlazorAppWebpackImageRulesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_image_rules_service_1.BlazorAppWebpackImageRulesService],
        }).compile();
        service = module.get(webpack_image_rules_service_1.BlazorAppWebpackImageRulesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-image-rules.service.spec.js.map