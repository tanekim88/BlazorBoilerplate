import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ReactAppModulesModule } from './modules/modules.module';
@Module({
    imports: [ReactAppModulesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
