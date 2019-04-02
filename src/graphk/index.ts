import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {PolygonComponent} from './polygon/polygon.component';
import {GaugeStepComponent} from './gaugeStep/gaugeStep.component';

@NgModule({
    imports: [
    ],
    declarations: [PolygonComponent, GaugeStepComponent],
    exports: [PolygonComponent, GaugeStepComponent]
})
export class GraphkModule { }
