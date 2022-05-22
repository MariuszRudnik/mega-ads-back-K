export interface NewAdEntity extends Omit<AddEntity, 'id'>{
    id?:string;
}

export interface AddEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;

}