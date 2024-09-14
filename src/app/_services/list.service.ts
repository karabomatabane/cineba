import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { ViewList } from '../_models/list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getViewLists(byMe: boolean = false, saved: boolean = false): Observable<ViewList[]>{
    return this.http.get<ViewList[]>(this.baseUrl + 'view-list', { params: { byMe: byMe.toString(), saved: saved.toString() } });
  }

  getViewList(id: string): Observable<ViewList>{
    return this.http.get<ViewList>(this.baseUrl + 'view-list/' + id);
  }

  createViewList(list: Partial<ViewList>) {
    return this.http.post(this.baseUrl + 'view-list', list);
  }

  updateViewList(id: string, list: Partial<ViewList>): Observable<ViewList> {
    return this.http.put<ViewList>(this.baseUrl + 'view-list/' + id, list);
  }

  exitViewList(id: string): Observable<any> {
    return this.http.put(this.baseUrl + 'view-list/' + id + '/exit', {});
  }

  joinViewList(id: string): Observable<any> {
    return this.http.put(this.baseUrl + 'view-list/' + id + '/join', {});
  }
}
