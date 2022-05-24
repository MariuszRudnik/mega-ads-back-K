export interface NewAdEntity extends Omit<AddEntity, 'id'>{
    id?:string;
}
export interface SimpleAdEntity {
    id: string;
    lat: number;
    lon: number;
}

export interface AddEntity extends SimpleAdEntity{
    name: string;
    description: string;
    price: number;
    url: string;
}

