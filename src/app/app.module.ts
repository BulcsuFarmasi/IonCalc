import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { CalculatorPage } from '../pages/calculator/calculator';
import { DisplayComponent } from '../components/display/display'
import { KeyboardComponent } from '../components/keyboard/keyboard';
import { DisplayService } from '../services/display/display';
import { KeyboardService } from '../services/keyboard/keyboard';
import './rxjs';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorPage,
    DisplayComponent,
    KeyboardComponent
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    CalculatorPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, DisplayService, KeyboardService]
})
export class AppModule {}
