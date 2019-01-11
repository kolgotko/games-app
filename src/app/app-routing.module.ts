import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from "./game/game.component";
import { DeveloperComponent } from "./developer/developer.component";
import { PublisherComponent } from "./publisher/publisher.component";

const routes: Routes = [
  { path: "games/:id", component: GameComponent },
  { path: "developers/:id", component: DeveloperComponent},
  { path: "publisher/:id", component: PublisherComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
