import { Body, Controller, Get, NotFoundException, Param, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { UrlService } from '../services/url.service';
import * as validUrl from 'valid-url';
import * as _ from 'lodash';
import { HttpExceptionFilter } from '../exception_filters/http-exception.filter';
import { UrlDataDTO } from 'src/dtos/url.dto';
import { CodeDTO } from 'src/dtos/code.dto';
import { Url } from '../models/url.model';
import { PopularUrlDataDTO } from 'src/dtos/popular-url.dto';



@Controller('api')

@UseFilters(HttpExceptionFilter)
export class UrlController {
    constructor(private readonly urlService: UrlService) { }

    @Post('/url/shorten')
    async getShortUrl(@Body() longUrl: UrlDataDTO): Promise<Url> {
        const baseUrl = process.env.BASE_URL;

        if (!validUrl.isUri(baseUrl)) {
            throw new UnauthorizedException("Invalid base url")
        }
        try {
            const shortenedUrl = await this.urlService.shortrenUrl(longUrl.longUrl, baseUrl);
            return shortenedUrl;
        } catch (err) {
            return err;
        }
    }

    @Get(':code')
    async redirectToLongURL(@Param() codeDto: CodeDTO): Promise<Url> {
        try {
            const url = await this.urlService.findByCode(codeDto.code);
            if (!_.isEmpty(url)) {
                return url;
            } else {
                throw new NotFoundException('No url found')
            }
        } catch (err) {
            console.error(err)
            return err;
        }
    }

    @Get('url/admin')
    async getMostPopularUrls(): Promise<PopularUrlDataDTO[]> {
        try {
            const popularUrls = await this.urlService.getPopularUrls();
            if (_.isEmpty(popularUrls)) {
                throw new NotFoundException('No urls found');
            }
            return popularUrls
        } catch (err) {
            return err;
        }
    }
}
   