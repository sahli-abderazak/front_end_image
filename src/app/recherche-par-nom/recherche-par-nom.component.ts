import { Component, OnInit } from '@angular/core'; 
import { FilmService } from '../services/film.service';
import { Film } from '../model/film.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent implements OnInit { 

  nomFilm!: string;
  films!: Film[];
  allFilms! : Film[];
searchTerm!: string;

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.listeFilm().subscribe(film => {
      console.log(film);
      this.films = film;
      });
    }

  rechercherFilm() {
    this.filmService.rechercherParFilm(this.nomFilm).
    subscribe(film => {
    this.films = film;
    });
  }
  // onKeyUp(filterText : string){
  //   this.films = this.allFilms.filter(item =>
  //   item.nomFilm.toLowerCase().includes(filterText));
  //   }
}

