import { IsInt, IsString, IsUrl, MinLength } from "class-validator";


export class PopularUrlDataDTO{
    @IsString()
    @IsUrl()
    @MinLength(20)
    longBaseUrl: string
    @IsInt()
    dayOfTheMonth: number
    @IsInt()
    count: number
   
    constructor(partial: Partial<PopularUrlDataDTO>) {
        Object.assign(this, partial);
      }
};