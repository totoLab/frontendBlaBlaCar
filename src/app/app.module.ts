import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [AppComponent, HomeComponent, AdsListPageComponent, AdsListComponent, HeaderComponent, UserPageComponent, AdPublishComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [AdService, CommonService],
  bootstrap: [AppComponent]
})

export class AppModule { }
