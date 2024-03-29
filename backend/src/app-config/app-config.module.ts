import { Module } from '@nestjs/common';
import { AppConfigController } from './app-config.controller';
import { AppConfigService } from './app-config.service';

@Module({
    providers: [AppConfigService],
    controllers: [AppConfigController],
    exports: [AppConfigService]
})
export class AppConfigModule { }
