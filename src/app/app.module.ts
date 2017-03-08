import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AppComponent } from './app.component';
import { CalculatorPage } from '../pages/calculator/calculator';
import { DisplayComponent } from '../components/display/display'
import { KeyboardComponent } from '../components/keyboard/keyboard';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorPage,
    DisplayComponent,
    KeyboardComponent
  ],
  imports: [
    IonicModule.forRoot(AppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    CalculatorPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
