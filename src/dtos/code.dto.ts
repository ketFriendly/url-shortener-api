import { IsString, MaxLength, MinLength } from "class-validator";


export class CodeDTO{
    @IsString()
    @MinLength(9)
    @MaxLength(9)
    code: string
   
    constructor(partial: Partial<CodeDTO>) {
        Object.assign(this, partial);
      }
};