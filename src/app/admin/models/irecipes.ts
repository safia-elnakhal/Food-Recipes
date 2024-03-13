import { ICategory } from './category';
import { ITag } from './itag';

export interface IRecipes {
  creationDate: string;
  id: number;
  modificationDate: string;
  name: string;
  description: string;
    price: number;
    tagId: number[];
    tag: ITag;
  recipeImage: string;
  imagePath: string;
  category?: ICategory[];
  categoriesIds: number[];
}
