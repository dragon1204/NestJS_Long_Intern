import { NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { error } from "console";

export class EvnCheckMiddleware implements NestMiddleware{
    constructor(private configService: ConfigService){}

    use(req, res, next: () => void){
        const secret_key = this.configService.get<string>("SECRET_KEY")
        if(!secret_key){
            throw new error("Thiếu Secret_key")
            console.log("thieu secret_key")
        }

        const data_url = this.configService.get<string>("DATA_URL")
        if(!data_url){
            throw new error( "the evn_file los database_url")
        }

       next()
    }
}
