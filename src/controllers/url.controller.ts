import { Controller, Post, Req, Res } from '@nestjs/common';
import { UrlService } from '../services/url.service';
import { Request, Response } from 'express';
import * as validUrl from 'valid-url';


@Controller('api')
export class UrlController {
    constructor(private readonly urlService: UrlService) { }

    @Post('/url/shorten')
    async getShortUrl(@Req() req: Request, @Res() res: Response) {
        const { longUrl } = req.body;
        const baseUrl = process.env.BASE_URL;
        if (!validUrl.isUri(baseUrl)) {
            return res.status(401).json('Invalid base url')
        }
        else if (!validUrl.isUri(longUrl)) {
            return res.status(401).json('Invalid long url')
        } else {
            try {
                const shortenedUrl = await this.urlService.shortrenUrl(longUrl, baseUrl);
                return res.json(shortenedUrl);
            } catch (error) {
                res.status(500).json('Server error.')
            }
        }
    }
}