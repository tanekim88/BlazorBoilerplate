import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModulesModule } from './modules/modules.module';
@Module({
    imports: [AuthModulesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
