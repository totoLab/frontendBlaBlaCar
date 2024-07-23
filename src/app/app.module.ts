import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdService } from './services/ads-service.service';
import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AdsListComponent } from './ads-list/ads-list.component';
import { AdsListPageComponent } from './ads-list-page/ads-list-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';
import { AdPublishComponent } from './ad-publish/ad-publish.component';
import { CommonService } from './services/common.service';
import Keycloak from 'keycloak-js';
import { KeycloakService } from './services/keycloak.service';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init()
}

@NgModule({
  declarations: [AppComponent, HomeComponent, AdsListPageComponent, AdsListComponent, HeaderComponent, UserPageComponent, AdPublishComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [AdService, CommonService, 
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
