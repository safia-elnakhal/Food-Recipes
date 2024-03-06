export interface table{
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
    data: ICategory[];     
}

export interface ICategory {

    creationDate:string ;
    id: number ;
    modificationDate: string ;
    name: string ;

}
