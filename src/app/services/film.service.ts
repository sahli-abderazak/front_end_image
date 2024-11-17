import { GenreWrapper } from './../model/genreWrapped.model';
import { AuthService } from './auth.service';
import { Genre } from '../model/genre.model';
import { Film } from './../model/film.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../model/image.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class FilmService {
  apiURL: string = 'http://localhost:8081/films/api';
  apiURLGenre: string = 'http://localhost:8081/films/genre';
  // films!: Film[];
  Genre!: Genre[];

  constructor(private http: HttpClient, private authService: AuthService) {}
  // this.genre = [
  //   { idGenre: 1, nomGenre: 'Comedie' },
  //   { idGenre: 2, nomGenre: 'Action' },
  //   { idGenre: 3, nomGenre: 'Drama' },
  // ];

  // this.films = [
  //   {
  //     idFilm: 1,
  //     nomFilm: "That's My Boy ",
  //     rateFilm: 4.5,
  //     dateSortie: new Date('06/15/2012'),
  //     genre: { idGenre: 1, nomGenre: 'Comedie' },
  //   },
  //   {
  //     idFilm: 2,
  //     nomFilm: 'Bodyguard',
  //     rateFilm: 3,
  //     dateSortie: new Date('09/3/2018'),
  //     genre: { idGenre: 2, nomGenre: 'Action' },
  //   },
  //   {
  //     idFilm: 3,
  //     nomFilm: 'The Dictator',
  //     rateFilm: 5,
  //     dateSortie: new Date('05/16/2012'),
  //     genre: { idGenre: 3, nomGenre: 'Drama' },
  //   },
  // ];
  consulterGenre(id: number): Genre {
    return this.Genre.find((gen) => gen.idGenre == id)!;
  }
  listeFilm(): Observable<Film[]> {
    // let jwt = this.authService.getToken();
    // jwt = "Bearer " + jwt;
    // let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Film[]>(this.apiURL + '/all');
  }
  ajouterGenre(gen: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.apiURLGenre, gen, httpOptions);
  }
  ajouterFilm(film: Film): Observable<Film> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Film>(this.apiURL + '/addfilm', film, {
      headers: httpHeaders,
    });
  }
  supprimerFilm(id: number) {
    const url = `${this.apiURL}/delfilm/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterFilm(id: number): Observable<Film> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Film>(url, { headers: httpHeaders });
  }
  UpdateFilm(film: Film): Observable<Film> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.put<Film>(this.apiURL + '/updatefilm', film, {
      headers: httpHeaders,
    });
  }

  // listeGenre(): Observable < Genre[] > {
  //   let jwt = this.authService.getToken();
  //   jwt = "Bearer " + jwt;
  //   let httpHeaders = new HttpHeaders({ "Authorization": jwt })
  //     return this.http.get<Genre[]>(this.apiURLGenre, { headers: httpHeaders }
  //   );
  //     }
  // listeGenre(): Observable < Genre[] > {
  //   let jwt = this.authService.getToken();
  //   jwt = "Bearer " + jwt;
  //   let httpHeaders = new HttpHeaders({ "Authorization": jwt })
  //     return this.http.get<Genre[]>(this.apiURLGenre, { headers: httpHeaders }
  //   );
  listeGenre(): Observable<GenreWrapper> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<GenreWrapper>(this.apiURLGenre, {
      headers: httpHeaders,
    });
  }
  // listeCategories():Observable<CategorieWrapper>{
  //   return this.http.get<CategorieWrapper>(this.apiURLCat);
  //   }

  rechercherParGenre(idGenre: number): Observable<Film[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    const url = `${this.apiURL}/filmsgenre/${idGenre}`;
    return this.http.get<Film[]>(url, { headers: httpHeaders });
  }
  rechercherParFilm(nom: string): Observable<Film[]> {
    const url = `${this.apiURL}/filmsByName/${nom}`;
    return this.http.get<Film[]>(url);
  }
  //       ajouterGenre(gen: Genre): Observable<Genre> {
  //   return this.http.post<Genre>(this.apiURLGenre, gen, httpOptions);
  // }
 
  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageFilm(
    file: File,
    filename: string,
    idFilm: number
  ): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uplaodImageFilm'}/${idFilm}`;
    return this.http.post(url, imageFormData);
  }
  supprimerImage(id: number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
  // // uploadImageFS(file: File, filename: string, idFilm : number): Observable<any>{
  // //   const imageFormData = new FormData();
  // //   imageFormData.append('image', file, filename);
  // //   const url = `${this.apiURL + '/image/uploadFS'}/${idFilm}`;
  // //   return this.http.post(url, imageFormData);
  // //   }
}
