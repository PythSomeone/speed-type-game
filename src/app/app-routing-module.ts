import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TitleComponent} from "./title/title.component";
import {GameComponent} from "./game/game.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";


const routes: Routes = [
  {path: '', component: TitleComponent},
  {path: 'game', component: GameComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
