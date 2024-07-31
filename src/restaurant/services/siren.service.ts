import { Injectable } from "@nestjs/common";
import { SirenDataGateway } from "../interface/siren.interface";
import { HttpService } from "@nestjs/axios";
import { Cron } from "@nestjs/schedule";
import { lastValueFrom } from "rxjs";

@Injectable()
export class SirenApiService implements SirenDataGateway {
    token: string;

    constructor(private readonly httpService: HttpService) { }

    @Cron('0 0 * * *')
    async getToken() {
        await this.httpService.post(
            'https://api.insee.fr/token',
            new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_id': '9AkxzV5oPjJb3VLxDQc7ynewwuga',
                'client_secret': 'rvaykL0acKSg3HEPqeD_4G4C94oa'
            }),
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                }
            }
        ).subscribe({
            next: (res) => {
                this.token = 'Bearer ' + res.data.access_token;
            },
            error: (err) => {
                console.log(err);
            }
        })
    };

    async checkSiren(siren: number): Promise<boolean>{
        let url = "https://api.insee.fr/entreprises/sirene/V3.11/siren/" + siren;
        return lastValueFrom(this.httpService.get(url,
            {
                headers: {
                    'Authorization': this.token
                }
            })).then((res) => {
                for(let data of res.data.uniteLegale.periodesUniteLegale){
                    if(data.etatAdministratifUniteLegale === 'C'){
                        return false;
                    }                    
                }
                return true;
            }).catch((err) => {
                return false;
            })
    };

}