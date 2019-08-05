import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AuthGuardService } from './auth-guard.service';
import { UserViewComponent } from './user-view/user-view.component';
import { HttpService } from './http.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutofocusDirective } from './autofocus.directive';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    UserViewComponent,
    AutofocusDirective,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'', redirectTo:'login', pathMatch:'full'},
      {path:'login', component:LoginComponent},
      {path:'search', component:SearchComponent,canActivate:[AuthGuardService]},
      {path:'user/:userId', component:UserViewComponent,canActivate:[AuthGuardService]},
      
      {path:'**',component:NotFoundComponent}
   
    ])
  ],
  providers: [AuthGuardService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
