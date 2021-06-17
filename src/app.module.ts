import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './exception_filters/http-exception.filter';
import { UrlModule } from './modules/url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UrlModule
  ],
  controllers: [AppController],
  providers: [AppService,
    { provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ],
})
export class AppModule {}
