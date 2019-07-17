import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  model : any = {};
  
  constructor(
    private http : HttpClient,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    sessionStorage.setItem('token', '');
}

  login() {
      let url = environment.apiUrl + '/auth/signin';
      this.http.post<Observable<boolean>>(url, {
        username: this.model.username,
        password: this.model.password
    }).subscribe(isValid => {
        if (isValid) {
            sessionStorage.setItem(
              'token', 
              btoa(this.model.username + ':' + this.model.password)
            );
        this.router.navigate(['']);
        } else {
            alert("Authentication failed.")
        }
    });
  }

}
