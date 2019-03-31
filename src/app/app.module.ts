import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GraphkModule} from '../graphk';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        GraphkModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
