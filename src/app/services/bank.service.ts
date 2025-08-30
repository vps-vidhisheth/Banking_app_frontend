// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BankService {

//   private apiUrl = 'http://localhost:8080/api/v1/banks';

//   constructor(private http: HttpClient) { }

//   private getAuthHeaders(): HttpHeaders {
//     const token = localStorage.getItem('jwt'); // 👈 JWT token stored after login
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`  // 👈 backend expects this
//     });
//   }

//   getBanks(): Observable<any> {
//     return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
//   }

//   getBankById(id: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
//   }

//   createBank(bank: any): Observable<any> {
//     return this.http.post(this.apiUrl, bank, { headers: this.getAuthHeaders() });
//   }

//   updateBank(id: string, bank: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, bank, { headers: this.getAuthHeaders() });
//   }

//   deleteBank(id: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
//   }
  
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs'; // ✅ import map from rxjs

// ✅ Define or import Bank interface
export interface Bank {
  bank_id: string;
  name: string;
  abbreviation?: string;
  is_active?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private apiUrl = 'http://localhost:8080/api/v1/banks';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getBanks(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getBankById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createBank(bank: any): Observable<any> {
    return this.http.post(this.apiUrl, bank, { headers: this.getAuthHeaders() });
  }

  updateBank(id: string, bank: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bank, { headers: this.getAuthHeaders() });
  }

  deleteBank(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // ✅ get all banks for dropdown
  getAllBanks(): Observable<Bank[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}?limit=1000&offset=0`;

    return this.http.get<{ data: Bank[] }>(url, { headers })
      .pipe(
        map(res => res.data) // extract banks array
      );
  }

}
