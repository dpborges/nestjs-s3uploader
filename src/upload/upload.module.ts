import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  // -- Option #1: This provides static options object for Throttler
  // imports: [
  //   ThrottlerModule.forRoot({   /* limits 3 requests per 60 seconds */
  //     ttl: 60,
  //     limit: 3
  //   }),
  // ],
  // -- Option #2: Dynamically defines Throttler options object from .env config file
  imports: [
    ThrottlerModule.forRootAsync({   /* limits 3 requests per 60 seconds */
      useFactory: (configService: ConfigService) => ({
        ttl:   configService.getOrThrow('UPLOAD_RATE_TTL'),
        limit: configService.getOrThrow('UPLOAD_RATE_LIMIT'),
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
    
})
export class UploadModule {}
