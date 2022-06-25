import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // http://creativeonlinezone.com/project/homefix/api/update-service
  // id = Service ID - required -  if you want add then send me 0 - Zero - required integer
  // title =Service Title - required
  // category_id = Category ID
  // tag_id[] = Array of  Tag ID
  // status =1 for active - 0 for Inactive - Default value 0
  // body = Content
  // image = Image - required - jpeg,png,jpg,gif,svg - max size 2mb
  // image2 = Image - required - jpeg,png,jpg,gif,svg - max size 2mb
  // question[] = Array of FAQ question 
  // answer[] = Array of  FAQ Answer
  // galleryimage[]  = Array of gallery images"
  addUpdateService(token, data) {
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/update-service", data, {
      headers: httpHeaders
    });
  }

  // http://creativeonlinezone.com/project/homefix/api/get-service
  getService(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/get-service", data, {
      headers: httpHeaders
    });
  }

  // http://creativeonlinezone.com/project/homefix/api/service-list
  serviceList(token) {
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/service-list", JSON.stringify({}), {
      headers: httpHeaders
    });
  }


  // http://creativeonlinezone.com/project/homefix/api/add-job
  addJobDetails(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/add-job", data, {
      headers: httpHeaders
    });
  }


  // "id = Job ID - required -  if you want add then send me 0 - Zero - required integer
  // title =Job Title - required
  // category_id = Category ID
  // delivery_time_id = Delivery Time ID
  // status =1 for active - 0 for Inactive - Default value 0
  // body = Content
  // galleryimage[]  = Array of gallery images"
  // http://creativeonlinezone.com/project/homefix/api/update-job
  addUpdateJob(token, data) {
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/update-job", data, {
      headers: httpHeaders
    });
  }

  // http://creativeonlinezone.com/project/homefix/api/my-job
  myJob(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/my-job", data, {
      headers: httpHeaders
    });
  }

  // http://creativeonlinezone.com/project/homefix/api/get-job
  getAllJobs(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/get-job",data, {
      headers: httpHeaders
    });
  }


  // code = Proposal code for start chat connection - Optional

  // http://creativeonlinezone.com/project/homefix/api/messages
  messages(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/messages", data, {
      headers: httpHeaders
    });
  }

  // fetch_id = User ID
  // connectionid = Connection ID
  // http://creativeonlinezone.com/project/homefix/api/fetch-messages
  fetchMessages(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/fetch-messages", data, {
      headers: httpHeaders
    });
  }

  //   "fetch_id = User ID
  // connectionid = Connection ID
  // // scroll_offset = first time Return variable=> ""offet"" from fetch-messages End point then Return variable=> ""offet"" from prepend-message End point"

  // http://creativeonlinezone.com/project/homefix/api/prepend-message
  prependMessage(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/prepend-message", data, {
      headers: httpHeaders
    });
  }


  // "receiver_id=User ID
  // connection_id= Connection ID
  // message_type = Video message=>2, Image=>4, Any other File upload => 5, Normal text => 3 , '6'=>'Send Contract', '7'=>'Accept Contract', '8'=>'Withdraw Contract', '9'=>'Completed Contract'
  // message=Message Text
  // file_name = Upload video/image/another file"
  // http://creativeonlinezone.com/project/homefix/api/post-message
  postMessage(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/post-message", data, {
      headers: httpHeaders
    });
  }



  // id = Comment ID for update comment - If you want to update comment then user_id is required in create comment time & also update time
  // user_id = User ID
  // blog_id=Blog ID - Required
  // name=Full name - Required
  // email=Email - Required
  // body=Message - Required
  // parent_id= Comment ID for reply - Optional
  // http://creativeonlinezone.com/project/homefix/api/post-comment
  postComment(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/post-comment", data, {
      headers: httpHeaders
    });
  }


  // http://creativeonlinezone.com/project/homefix/api/my-proposal
  myProposal(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/my-proposal", data, {
      headers: httpHeaders
    });
  }


  // http://creativeonlinezone.com/project/homefix/api/update-rating?job_id=1&rating=4.5&review=Good
  addReview(token, data) {
    // const formData = new FormData();
    // formData.append('data', data);
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    return this.http.post(environment.API + "/api/update-rating", data, {
      headers: httpHeaders
    });
  }

  // http://creativeonlinezone.com/project/homefix/api/get-state?country_id=233
  getStates(id) {
    return this.http.get(environment.API + "/api/get-state?country_id=" + id);
  }

}
