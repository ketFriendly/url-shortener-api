import { Model } from "mongoose";
import { Url } from "../models/url.model";
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { customAlphabet } from 'nanoid/async'

@Injectable()
export class UrlService {
    constructor(
        @InjectModel('Url') private urlModel: Model<Url>,
    ) { }
    
    async shortrenUrl(longUrl: string, baseUrl: string) {
        const nanoid = customAlphabet('1234567890abcdef', 9);
        const urlCode = await nanoid();
        let url = await this.urlModel.findOne({ longUrl });
        if (url) {
            return url;
        } else {
            const shortUrl = baseUrl + '/' + urlCode;
            url = new this.urlModel({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date()
            })
            await url.save();
            return url;
        }
    }
}