import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  ) { }

  ngOnInit() {
    sessionStorage.setItem('token', '');
}

  onSubmit() {
      let url = environment.apiUrl + '/auth/signin';
      this.http.post<Observable<boolean>>(url, {
        username: this.model.username,
        password: this.model.password
    }).subscribe(res => this.storeToken(JSON.stringify(res.token))); {
    };
  }

  storeToken(res) {
    sessionStorage.setItem(
      'token', res
    )
  }

}
