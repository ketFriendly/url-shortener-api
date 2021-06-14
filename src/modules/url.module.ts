import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UrlSchema } from '../models/url.model'
import { UrlController } from '../controllers/url.controller';
import { UrlService } from '../services/url.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Url', schema: UrlSchema}]),
  ],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}