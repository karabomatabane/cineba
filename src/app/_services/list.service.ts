import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ViewList } from '../_models/list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getViewLists(): Observable<ViewList[]>{
    return this.http.get<ViewList[]>(this.baseUrl + 'viewList');
  }

  getViewList(id: string): Observable<ViewList>{
    return this.http.get<ViewList>(this.baseUrl + 'viewList/' + id);
  }

  createViewList(list: Partial<ViewList>) {
    return this.http.post(this.baseUrl + 'viewList', list);
  }

  updateViewList(id: string, list: Partial<ViewList>): Observable<ViewList> {
    return this.http.put<ViewList>(this.baseUrl + 'viewList/' + id, list);
  }

  exitViewList(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'viewList/' + id);
  }
}
