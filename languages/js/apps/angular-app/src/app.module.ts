import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AngularAppModulesModule } from './modules/modules.module';
@Module({
    imports: [AngularAppModulesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
