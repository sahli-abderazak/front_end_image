import { Component , OnInit} from '@angular/core';
import { Genre } from '../model/genre.model';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html',
  styles: [
  ]
})
export class ListeGenresComponent implements OnInit {
  genres! : Genre[];

  updatedGen:Genre = {"idGenre":0,"nomGenre":""};
  ajout:boolean=true;


  constructor(private filmService : FilmService) { }
  ngOnInit(): void {
  this.filmService.listeGenre().
  subscribe(gens => {this.genres= gens._embedded.genres;
  console.log(gens);
  });
  }


  genreUpdated(gen:Genre){
    console.log("gen updated event",gen);
    this.filmService.ajouterGenre(gen).
     subscribe( ()=> this.chargerGenres());
    }
    chargerGenres(){
      this.filmService.listeGenre().
      subscribe(cats => {this.genres = cats._embedded.genres;
      console.log(cats);
      });
      }

      updateGen(gen:Genre) {
        this.updatedGen=gen;
        this.ajout=false; 
        }
        
}