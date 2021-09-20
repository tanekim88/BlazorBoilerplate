import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SolidAppModulesModule } from './modules/modules.module';
@Module({
    imports: [SolidAppModulesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
