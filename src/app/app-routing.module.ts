import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanLoad} from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { BoardComponent } from './board/board.component';


const routes: Routes = [
  { path: '', component: BoardComponent,  canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
