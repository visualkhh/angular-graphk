import {Component, HostListener} from '@angular/core';
import {GaugeStepData} from "../graphk/gaugeStep/gaugeStep.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    w = 500;
    h = 270;
    gaugeData: GaugeStepData[];
    constructor() {
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.w = event.target.innerWidth - 100;
        this.h = event.target.innerWidth - 100;
        this.h = this.h / 2 + 20;
        // this.canvasElementRef.nativeElement.dispatchEvent(new Event('resize'));
        // // this.canvaseRedraw(event);
        const a = new GaugeStepData(); a.fillStyle = '#00ff00';  a.title = '매우낮음'; a.safe = true;  a.checked = false;
        const b = new GaugeStepData(); b.fillStyle = '#fffc5b';  b.title = '낮음'; b.safe = false;  b.checked = true;
        const c = new GaugeStepData(); c.fillStyle = '#a0b6ff';  c.title = '적정'; c.safe = true;  c.checked = false;
        const d = new GaugeStepData(); d.fillStyle = '#ff2c1b';  d.title = '좋음'; d.safe = false;  d.checked = true;
        const e = new GaugeStepData(); e.fillStyle = '#7effc0';  e.title = '높음'; e.safe = true;  e.checked = false;
        const f = new GaugeStepData(); f.fillStyle = '#c61dff';  f.title = '매우높음'; f.safe = true;  f.checked = true;
        this.gaugeData = [a, b, c, d, e, f]
    }
}
