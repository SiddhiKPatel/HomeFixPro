import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public userClick: Observable<any>;
  constructor(private _http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userClick') || '{}'));
    this.userClick = this.userSubject.asObservable();

  }

  userRegister(data: any) {
    const formData = new FormData();
    formData.append('data', data);

    return this._http
      .post(environment.API + "register", formData, {})
      .pipe(map((response: any) => {
        return response;
      }));
  }

  // http://creativeonlinezone.com/project/homefix/api/login
  // email = Email
  // password = Password
  userLogin(data: any) {
    // const formData = new FormData();
    // formData.append('data', data);
    return this._http
      .post(environment.API + "/api/login", data, {})
      .pipe(map((response: any) => {
        return response;
      }));
  }

  storeUserData(data: any) {
    localStorage.setItem('userClick', data);
    this.userSubject.next(data);
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("roleId");
    localStorage.removeItem("userName");
    localStorage.removeItem('userClick');
    this.userSubject.next(null);
  }

  // http://creativeonlinezone.com/project/homefix/api/get-profile
  getProfile(token) {

    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this._http.post(environment.API + "/api/get-profile", JSON.stringify({}), {
      headers: httpHeaders
    });
    // return this._http.post(environment.API + "/api/get-profile", userId);
    // return this._http
    // .post(environment.API + "/api/get-profile", data, {})
    // .pipe(map((response: any) => {
    //   return response;
    // }));
  }

  // http://creativeonlinezone.com/project/homefix/api/update-password
  // old_password = password - required
  // password = New password - required
  // password_confirmation = password confirmation - required"
  changePassword(token, data) {
    const formData = new FormData();
    formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this._http.post(environment.API + "/api/update-password", formData, {
      headers: httpHeaders
    });
  }

  // http://creativeonlinezone.com/project/homefix/api/update-avatar
  profileImageUpdate(token, data) {
    const formData = new FormData();
    formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this._http.post(environment.API + "/api/update-avatar", formData, {
      headers: httpHeaders
    });
  }


  // http://creativeonlinezone.com/project/homefix/api/update-profile
  // avatar = Profile Image (Optional)
  // fname (required)
  // lname (Optional)
  // email  (required)
  // phone_number  (Optional)
  // country_id = country ID - Optional
  // city = city name - Optional
  // zip_code = zip code - Optional
  // description = Description - Optional
  // facebook_url = Facebook URL - Optional
  // instagram_url =instagram URL - Optional
  // twitter_url = twitter URL - Optional
  // linkedin_url = linkedin URL - Optional
  // skill_id[] = Array of Skill ID
  updateProfile(token, data) {
    const formData = new FormData();
    formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this._http.post(environment.API + "/api/update-profile", formData, {
      headers: httpHeaders
    });
  }


}
