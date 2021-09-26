"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_watch_entries_plugin_service_1 = require("./webpack-watch-entries-plugin.service");
describe('AuthWebpackWatchEntriesPluginConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_watch_entries_plugin_service_1.AuthWebpackWatchEntriesPluginConfigService],
        }).compile();
        service = module.get(webpack_watch_entries_plugin_service_1.AuthWebpackWatchEntriesPluginConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-watch-entries-plugin.service.spec.js.map