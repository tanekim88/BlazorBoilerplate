"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_webpack_fix_style_only_entries_service_1 = require("./webpack-webpack-fix-style-only-entries.service");
describe('BlazorAppWebpackWebpackFixStyleOnlyEntriesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_webpack_fix_style_only_entries_service_1.BlazorAppWebpackWebpackFixStyleOnlyEntriesService],
        }).compile();
        service = module.get(webpack_webpack_fix_style_only_entries_service_1.BlazorAppWebpackWebpackFixStyleOnlyEntriesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-fix-style-only-entries.service.spec.js.map