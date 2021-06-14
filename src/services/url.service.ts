import { Model } from "mongoose";
import { Url } from "../models/url.model";
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UrlService {
    constructor(
        @InjectModel('Url') private urlModel: Model<Url>,
        ){}
    
}