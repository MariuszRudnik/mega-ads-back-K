import {AddEntity} from "../types/add/ad-entity";
import {ValidationError} from "../utils/errors";

interface NewAdEntity extends Omit<AddEntity, 'id'>{
    id?:string;
}

export class AddRecords implements AddEntity {
    description: string;
    id: string;
    lat: number;
    lon: number;
    name: string;
    price: number;
    url: string;

    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length > 100){
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta, ani przekaraczać 100 znaków.')
        }
        if(obj.description.length < 1000){
            throw new ValidationError('Treśc ogłoszenia nie może przekraczac 1000 znaków');
        }
        if (obj.price < 0 || obj.price> 999999999){
            throw new ValidationError('Cena nie moze być mniejsza niż 0 lul większa niż 9 999 999.');
        }
        // @TODO: cHECK IF url is vallid!
        if (!obj.url || obj.url.length > 100){
            throw new ValidationError('link ogłoczenia nie może być pusty anie przekaracza 100 znaków')
        }
        if (typeof obj.lon !== 'number' ||  typeof obj.lat !== 'number' ){
            throw new ValidationError(' Nie można zlokalizaowac ogłoszenia.')
        }
    }
}