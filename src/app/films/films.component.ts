import { Component, OnInit } from '@angular/core';
import { Film } from '../model/film.model';
import { FilmService } from '../services/film.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];

  constructor(
    private filmService: FilmService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chargerFilms();
  }

  chargerFilms() {
    this.filmService.listeFilm().subscribe((filmList) => {
      this.films = filmList;
      this.films.forEach((film) => {
        // Vérifie si le film a un tableau d'images avec au moins une image
        if (film.images && film.images.length > 0 && film.images[0].image) {
          film.imageStr = 'data:' + film.images[0].type + ';base64,' + film.images[0].image;
        }
      });
    });
  }
 

  supprimerFilm(f: Film) {
    const conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.filmService.supprimerFilm(f.idFilm).subscribe(() => {
        this.chargerFilms();
      });
    }
  }
}
