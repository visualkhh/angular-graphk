import {Component, HostListener} from '@angular/core';
import {GaugeStepData} from '../graphk/gaugeStep/GaugeStepData';

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
        const a = new GaugeStepData(); a.fillStyle = '#00ff00';  a.title = '매우좌뇌편중'; a.safe = true;  a.checked = true;
        const b = new GaugeStepData(); b.fillStyle = '#fffc5b';  b.title = '좌뇌편중'; b.safe = true;  b.checked = false;
        const c = new GaugeStepData(); c.fillStyle = '#a0b6ff';  c.title = '균형'; c.safe = true;  c.checked = false;
        const d = new GaugeStepData(); d.fillStyle = '#ff2c1b';  d.title = '우뇌편중'; d.safe = false;  d.checked = false;
        const e = new GaugeStepData(); e.fillStyle = '#c61dff';  e.title = '매우우뇌편중'; e.safe = false;  e.checked = false;
        this.gaugeData = [a, b, c, d, e]
        // this.gaugeData = [a, b, c, d, ]
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.w = event.target.innerWidth - 100;
        this.h = event.target.innerWidth - 100;
        this.h = this.h / 2 + 20;
        // this.canvasElementRef.nativeElement.dispatchEvent(new Event('resize'));
        // // this.canvaseRedraw(event);
    }
}
