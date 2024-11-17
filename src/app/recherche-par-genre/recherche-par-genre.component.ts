
import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { Film } from '../model/film.model';
import { FilmService } from '../services/film.service';
@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',

})
export class RechercheParGenreComponent implements OnInit{

  films! : Film[];
  idGenres! : number;
  genres! : Genre[]; 

  constructor(private filmService: FilmService) {}
  // ngOnInit(): void{
  //   this.filmService.listeGenre().
  //   subscribe(film => {this.genres = film;

  //   });
  // }
  ngOnInit(): void {
    this.filmService.listeGenre().subscribe(genreWrapper => {
      if (genreWrapper && genreWrapper._embedded) {
        this.genres = genreWrapper._embedded.genres;
      }
    });
  }

  onChange(){
     this.filmService.rechercherParGenre(this.idGenres).
     subscribe(film =>{this.films=film}); 
  }
}
