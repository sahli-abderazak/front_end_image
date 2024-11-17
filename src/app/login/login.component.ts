import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent {
  user = new User();
  err : number = 0;
  message : string = "login ou mot de passe erronés..";

  constructor(private authService : AuthService,
    private router: Router) { }
  ngOnInit() {}
  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        this.err = 0;
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
        if (err.error.errorCause == 'disabled') {
          this.message = "Utilisateur désactivé, Veuillez contacter votre Administrateur";
        } else {
          this.message = "login ou mot de passe erronés..";
        }
      }
    });
  }
  
}
