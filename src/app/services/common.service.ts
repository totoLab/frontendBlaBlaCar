import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router) { }

  redirectFunction(page: String) {
    this.router.navigate(["/", page], {});
  }
}
