import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',

            })
        };

@Injectable({
  providedIn: 'root'
})

export class PagesService {
  public apiurl = environment.API;
  // public homePageData: any;
  // public headerData: any;

  constructor(private http: HttpClient) { }

  // http://creativeonlinezone.com/project/homefix/api/get-header
  getHeader() {
    let user_id = localStorage.getItem("userId");
    if(user_id){
      const formData = new FormData();
      formData.append('user_id', user_id);
      return this.http.post(this.apiurl + '/api/get-header', formData);
    }else{
     return this.http.post(this.apiurl + '/api/get-header', JSON.stringify({}));
    }
  }

  // http://creativeonlinezone.com/project/homefix/api/get-footer
  getFooter() {
    return this.http.post(this.apiurl + '/api/get-footer', JSON.stringify({}));
  }

  // http://creativeonlinezone.com/project/homefix/api/get-page
  // http://creativeonlinezone.com/project/homefix/api/get-page?slug=blog
  getPage(slug) {
    const formData = new FormData();
    formData.append('slug', slug);
    return this.http.post(this.apiurl + '/api/get-page', formData);
  }

  // http://creativeonlinezone.com/project/homefix/api/get-register
  getRegister() {
    return this.http.post(this.apiurl + '/api/get-register', JSON.stringify({}));
  }

  // http://creativeonlinezone.com/project/homefix/api/register
  // fname = First name 
  // lname = Last name  - Optional
  // email = unique Email 
  // password = password 
  // password_confirmation = password confirmation 
  // phone_number = phone number - Optional
  // country_id = country ID - Optional
  // city = city name - Optional
  // zip_code = zip code - Optional
  register(data) {
    // const formData = new FormData();
    // formData.append('data', data);
    return this.http.post(this.apiurl + '/api/register', data);
  }

  // http://creativeonlinezone.com/project/homefix/api/login
  // email = Email
  // password = Password
  login(data) {
    const formData = new FormData();
    formData.append('data', data);
    return this.http.post(this.apiurl + '/api/login', formData);
  }

  // http://creativeonlinezone.com/project/homefix/api/forgot-password
  // email = Email
  // password = Password
  forgotPassword(data) {
    // const formData = new FormData();
    // formData.append('data', data);
    return this.http.post(this.apiurl + '/api/forgot-password', data);
  }

  // http://creativeonlinezone.com/project/homefix/api/get-blog-details
  getBlogDetails(data) {
    const formData = new FormData();
    formData.append('data', data);
    return this.http.post(this.apiurl + '/api/get-blog-details', formData);
  }

  // http://creativeonlinezone.com/project/homefix/api/get-services
  getServices(data) {
    const formData = new FormData();
    formData.append('data', data);
    return this.http.post(this.apiurl + '/api/get-services', formData);
  }

  // http://creativeonlinezone.com/project/homefix/api/get-service-category-details
  getServiceCategoryDetails(data) {
    const formData = new FormData();
    formData.append('data', data);
    return this.http.post(this.apiurl + '/api/get-service-category-details', formData);
  }

  // http://creativeonlinezone.com/project/homefix/api/get-service-category
  getServiceCategory(data) {
    const formData = new FormData();
    formData.append('data', data);
    return this.http.post(this.apiurl + '/api/get-service-category', formData);
  }

  // http://creativeonlinezone.com/project/homefix/api/get-service-details
  getServiceDetails(data) {
    const formData = new FormData();
    formData.append('data', data);
    return this.http.post(this.apiurl + '/api/get-service-details', formData);
  }

  // http://creativeonlinezone.com/project/homefix/api/my-job-details
  myJobDetails(token, data) {
    const formData = new FormData();
    formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/my-job-details", formData, {
      headers: httpHeaders
    });
  }

  // http://creativeonlinezone.com/project/homefix/api/get-job-details
  getJobDetails(token, data) {
    const formData = new FormData();
    formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/get-job-details", formData, {
      headers: httpHeaders
    });
  }

  // http://creativeonlinezone.com/project/homefix/api/add-proposal
  addProposalPage(token, data) {
    const formData = new FormData();
    formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/add-proposal", formData, {
      headers: httpHeaders
    });
  }

  // http://creativeonlinezone.com/project/homefix/api/update-proposal
  //   "id =Proposal ID - required -  if you want add then send me 0 - Zero - required integer
  // job_id=Job ID - required
  // service_id=Service ID - required
  // amount=Job Price - required
  // delivery_time_id= Delivery Time ID - required
  // body= Description - Optional
  // file = Image - Optional"
  addUpdateProposal(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/update-proposal", data, {
      headers: httpHeaders
    });
  }

  // http://creativeonlinezone.com/project/homefix/api/create-job-request
  createJobRequest(token, data) {
    const formData = new FormData();
    formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/create-job-request", formData, {
      headers: httpHeaders
    });
  }

  

}
