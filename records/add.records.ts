import {AddEntity, NewAdEntity, SimpleAdEntity} from "../types/add/ad-entity";
import { pool } from "../utils/db";
import {ValidationError} from "../utils/errors";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid'


type AdRecordResults = [AddEntity[], FieldPacket[]]

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
        if(obj.description.length > 1000){
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
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string):Promise<AddRecords | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id",{
            id,
        }) as AdRecordResults;
        return results.length === 0 ? null: new AddRecords(results[0]);
    }
    static async findAll(name: string):Promise<SimpleAdEntity[]>{
        const [results] =await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;
        return results.map(result => {
            const {id, lat, lon} = result;
            return {
                id, lat, lon
            }
        });
    };
    async insert():Promise<void>{
        if(!this.id){
            this.id = uuid()
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }
        await pool.execute("INSERT INTO `ads`(`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)", this);
    }

}