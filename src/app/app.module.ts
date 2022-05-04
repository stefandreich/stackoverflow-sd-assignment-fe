import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { InputTextareaModule} from 'primeng/inputtextarea';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';

import { RegisterComponent } from './register/register.component';
import { InputQuestionComponent } from './input-question/input-question.component';

import { TagInputModule } from 'ngx-chips';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent},
  { path: 'question/:questionId', component: QuestionComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'add-question', component: InputQuestionComponent}
];

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, QuestionComponent, RegisterComponent, InputQuestionComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    PasswordModule,
    RippleModule,
    TableModule,
    InputTextareaModule,
    TagInputModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
