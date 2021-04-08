"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const regex_service_1 = require("./regex.service");
describe('BlazorAppRegexService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [regex_service_1.BlazorAppRegexService],
        }).compile();
        service = module.get(regex_service_1.BlazorAppRegexService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=regex.service.spec.js.map