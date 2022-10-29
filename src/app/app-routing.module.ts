import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XComponent } from './x/x.component';
import { YComponent } from './y/y.component';

const routes: Routes = [
  
  // { path: 'z', component: ZComponent },
  { path: 'y', component: YComponent },
  { path: 'x', component: XComponent },
  { path: '**', redirectTo: 'x' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
