import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/owners/login/login';
import { RegisterPage } from '../pages/owners/register/register';
import { ForgottenPage } from '../pages/owners/forgotten/forgotten';
import { DetailsPage } from '../pages/owners/details/details';
import { PublishPage } from '../pages/owners/publish/publish';
import { PublishedPage } from '../pages/owners/published/published';
import { PortfolioPage } from '../pages/owners/portfolio/portfolio';
import { PortfolioAddPage } from '../pages/owners/portfolio-add/portfolio-add';
import { PortfolioEditPage } from '../pages/owners/portfolio-edit/portfolio-edit';
import { PromotionsPage } from '../pages/owners/promotions/promotions';
import { EditPage } from '../pages/owners/edit/edit';
import { MapPage } from '../pages/owners/map/map';
import { SearchPage } from '../pages/clients/search/search';
import { SaloonsPage } from '../pages/clients/saloons/saloons';
import { SaloonPage } from '../pages/clients/saloon/saloon';
import { MapPosPage } from '../pages/clients/mappos/mappos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SearchPage,
    RegisterPage,
    ForgottenPage,
    PublishPage,
    PublishedPage,
    PortfolioPage,
    PortfolioAddPage,
    PortfolioEditPage,
    PromotionsPage,
    SaloonsPage,
    EditPage,
    SaloonPage,
    DetailsPage,
    MapPage,
MapPosPage
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
    ForgottenPage,
    PublishPage,
    PublishedPage,
    PortfolioPage,
    PortfolioAddPage,
    PortfolioEditPage,
    PromotionsPage,
    SaloonsPage,
    EditPage,
    SaloonPage,
    DetailsPage,
    MapPage,
MapPosPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
