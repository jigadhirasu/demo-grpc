import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZComponent } from './z/z.component';

const routes: Routes = [
  { path: '**', redirectTo: 'z' },
  { path: 'z', component: ZComponent },
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
