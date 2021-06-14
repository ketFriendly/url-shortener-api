import { Controller } from '@nestjs/common';
import { UrlService } from '../services/url.service';

@Controller()
export class UrlController {
  constructor(private readonly appService: UrlService) {}


}