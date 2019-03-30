import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FusionChartsModule} from 'angular-fusioncharts';
import {GraphkModule} from '../graphk/graphk.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FusionChartsModule,
        GraphkModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
