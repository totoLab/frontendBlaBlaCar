import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsListComponent } from './ads-list/ads-list.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'home', pathMatch: 'full', component: HomeComponent },
    { path: 'ads', pathMatch: 'full', component: AdsListComponent,
      // canActivate: [authGuard]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
