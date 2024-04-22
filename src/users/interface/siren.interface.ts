export abstract class SirenDataGateway{
    getToken: () => void;
    checkSiren: (siren : number) => Promise<boolean>;
}