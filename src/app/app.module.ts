import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TitleComponent} from './title/title.component';
import {GameComponent} from './game/game.component';
import {AppRoutingModule} from "./app-routing-module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "./_modal";
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import { ScoreListComponent } from './score-list/score-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    GameComponent,
    LoginComponent,
    RegisterComponent,
    ScoreListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
