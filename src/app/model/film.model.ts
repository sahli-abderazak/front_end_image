import { Genre } from "./genre.model";
import { Image } from "./image.model";

export class Film {
    idFilm! : number;
    nomFilm! : string;
    rateFilm! : number;
    genre!:Genre
    dateSortie! : Date ;
    image! : Image;
    imageStr!:string    
    images!: Image[];

    }