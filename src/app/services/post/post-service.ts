import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);

  private url = environment.apiBaseUrl;

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/api/v1/posts`);
  }

  addPost(reqBody: any): Observable<Post> {
    return this.http.post<Post>(`${this.url}/api/v1/posts`, reqBody);
  }

  deletePost(id: number | null): Observable<Post> {
    return this.http.delete<Post>(`${this.url}/api/v1/posts/${id}`)
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/api/v1/posts/${id}`);
  }

  updatePost(reqBody: any, id: number | null) {
    return this.http.put<Post>(`${this.url}/api/v1/posts/${id}`, reqBody);
  }

}