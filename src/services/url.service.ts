import { Model } from "mongoose";
import { Url } from "../models/url.model";
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { customAlphabet } from 'nanoid/async';
import * as _ from 'lodash';
import * as UrlParse from 'url-parse';

@Injectable()
export class UrlService {
    constructor(
        @InjectModel('Url') private urlModel: Model<Url>,
    ) { }
    
    async shortrenUrl(longUrl: string, baseUrl: string): Promise<Url> {
        const nanoid = customAlphabet('1234567890abcdef', 9);
        const urlCode = await nanoid();
        let url = await this.urlModel.findOne({ longUrl });
        if (!_.isEmpty(url)) {
            return url;
        } else {
            const shortUrl = baseUrl + '/' + urlCode;
            const parsed = new UrlParse(longUrl);
            const longBaseUrl = parsed.origin;
            url = new this.urlModel({
                longUrl,
                longBaseUrl,
                shortUrl,
                urlCode,
                date: new Date()
            })
            await url.save();
            return url;
        }
    }


    async findByCode( code: string ): Promise<Url> {
        let url = await this.urlModel.findOne({ urlCode: code });
        return url;
    }

    async getPopularUrls() {
        const ONE_DAY = 86_400_000;
        const endDate = Date.now();
        const startDate = endDate - ONE_DAY;
  
        const aggregationPipeline = [
            {
              '$match': {
                'date': {
                  '$gte': new Date(startDate), 
                  '$lte': new Date(endDate)
                }
              }
            }, {
              '$group': {
                '_id': {
                  'longBaseUrl': '$longBaseUrl', 
                  'dayOfTheMonth': {
                    '$dayOfMonth': '$date'
                  }
                }, 
                'count': {
                  '$sum': 1
                }
              }
            }, {
              '$project': {
                '_id': 0, 
                'longBaseUrl': '$_id.longBaseUrl', 
                'dayOfTheMonth': '$_id.dayOfTheMonth', 
                'count': '$count'
              }
            }, {
              '$sort': {
                'count': -1
              }
            }
          ]

        const popularAggregation = await this.urlModel.aggregate(aggregationPipeline);
        return popularAggregation;
    }
}