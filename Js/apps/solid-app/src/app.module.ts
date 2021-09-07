import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BlazorAppModulesModule } from './modules/modules.module';
@Module({
    imports: [BlazorAppModulesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
