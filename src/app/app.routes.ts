import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsListComponent } from './ads-list/ads-list.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdsListPageComponent } from './ads-list-page/ads-list-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { DummyComponent } from './dummy/dummy.component';
import { AdPublishComponent } from './ad-publish/ad-publish.component';
import { authGuard } from './guards/auth.guard';
import { UsersComponentComponent } from './users-component/users-component.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', pathMatch: 'full', component: HomeComponent },
    { path: 'ads', pathMatch: 'full', component: AdsListPageComponent,
      canActivate: [authGuard]
    },
    { path: 'users', pathMatch: 'full', component: UsersComponentComponent,
      canActivate: [authGuard]
     },
    { path: 'users/:username',
      children: [
        {
          path: '',
          component: UserPageComponent
        },
        {
          path: 'bookings',
          component: DummyComponent
        }
      ],
      canActivate: [authGuard]
    },
    { path: 'publish', pathMatch: 'full', component: AdPublishComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
