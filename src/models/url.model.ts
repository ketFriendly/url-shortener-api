import * as mongoose from 'mongoose';


export const UrlSchema = new mongoose.Schema({
  longUrl: { type: String },
  longBaseUrl: { type: String },
  shortUrl: { type: String },
  urlCode: { type: String },
  date: {type: Date, default : null},
  }, { collection: 'url' });


export class Url{
  _id: string; 
  longUrl: string;
  longBaseUrl: string;
  shortUrl: string;
  urlCode: string;
  date: string;
}  