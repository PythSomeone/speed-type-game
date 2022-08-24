import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TitleComponent} from "./title/title.component";
import {GameComponent} from "./game/game.component";


const routes: Routes = [
  {path: '', component: TitleComponent},
  {path: 'game', component: GameComponent},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
