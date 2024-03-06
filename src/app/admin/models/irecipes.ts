import { ICategory } from "./category";
import { ITag } from "./itag";

export interface IRecipes {
    creationDate:string ;
    id: number ;
    modificationDate: string ;
    name: string;
    description: string;
    price: number;
    tag:ITag;
    imagePath: string;
    category: ICategory[];

}

