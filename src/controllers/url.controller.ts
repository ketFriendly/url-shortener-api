import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UrlService } from '../services/url.service';
import { Request, Response } from 'express';
import * as validUrl from 'valid-url';
import * as _ from 'lodash';


@Controller('api')
export class UrlController {
    constructor(private readonly urlService: UrlService) { }

    @Post('/url/shorten')
    async getShortUrl(@Req() req: Request, @Res() res: Response) {
        const { longUrl } = req.body;
        const baseUrl = process.env.BASE_URL;
        if (!validUrl.isUri(baseUrl)) {
            return res.status(HttpStatus.UNAUTHORIZED).json('Invalid base url')
        }
        else if (!validUrl.isUri(longUrl)) {
            return res.status(HttpStatus.BAD_REQUEST).json('Invalid long url')
        } else {
            try {
                const shortenedUrl = await this.urlService.shortrenUrl(longUrl, baseUrl);
                return res.json(shortenedUrl);
            } catch (err) {
                console.error(err);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Server error.')
            }
        }
    }

    @Get(':code')
    async redirectToLongURL(@Req() req: Request, @Res() res: Response) {
        try {
            const url = await this.urlService.findByCode(req.params.code);
            if (!_.isEmpty(url)) {
                return res.redirect(HttpStatus.FOUND, url.longUrl);
            } else {
                return res.status(HttpStatus.NOT_FOUND).json('No url found');
            }
        } catch (err) {
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Server error');
        }
    }

    @Get('url/admin')
    async getMostPopularUrls(@Req()req: Request, @Res() res: Response) {
        try{
            const popularUrls = await this.urlService.getPopularUrls();
            if(_.isEmpty(popularUrls)){
                return res.status(HttpStatus.NOT_FOUND).json('No urls found');
            }
            return res.json(popularUrls)
        } catch (err) {
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Server error');
        }
    }
}