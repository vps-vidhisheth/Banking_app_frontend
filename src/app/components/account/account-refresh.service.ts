import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountRefreshService {
  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  // Call this to notify that accounts need to be refreshed
  triggerRefresh() {
    this.refreshSubject.next();
  }
}
