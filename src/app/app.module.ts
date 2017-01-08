import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/owners/login/login';
import { RegisterPage } from '../pages/owners/register/register';
import { PublishPage } from '../pages/owners/publish/publish';
import { SearchPage } from '../pages/clients/search/search';
import { SaloonsPage } from '../pages/clients/saloons/saloons';
import { SaloonPage } from '../pages/clients/saloon/saloon';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SearchPage,
    RegisterPage,
    PublishPage,
    SaloonsPage,
    SaloonPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SearchPage,
    RegisterPage,
    PublishPage,
    SaloonsPage,
    SaloonPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
