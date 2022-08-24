import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { GameComponent } from './game/game.component';
import {AppRoutingModule} from "./app-routing-module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    GameComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }