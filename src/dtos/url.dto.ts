import { IsString, IsUrl, MinLength } from "class-validator";


export class UrlDataDTO{
    @IsString()
    @IsUrl()
    @MinLength(20)
    longUrl: string
   
    constructor(partial: Partial<UrlDataDTO>) {
        Object.assign(this, partial);
      }
};