import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {timer} from 'rxjs/internal/observable/timer';

export class GaugeStepData {
    safe = false;
    safeFillStyle = 'rgba(71, 169, 203, 0.5)';
    title = '';
    checked = false;
    titleStyle = '#c3c3c3';
    fillStyle = '#fdd30e';
}

    // templateUrl: './polygon.component.html',
    // styleUrls: ['./polygon.component.scss']
    // template: '<canvas #canvas></canvas>'
    // 1.0.3
@Component({
    selector: 'graphk-gaugeStep',
    template: '<canvas #canvas></canvas>',
    styles: ['canvas {border: 1px solid black}']
})

export class GaugeStepComponent implements OnInit, AfterViewInit, OnChanges {
    @Input()
    public width: number;
    @Input()
    public height: number;
    @Input()
    public padding = 5;
    @Input()
    public data: GaugeStepData[];

    @Output()
    @ViewChild('canvas') public canvasElementRef: ElementRef;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.reDraw();
    }
    ngOnInit() {
        this.reDraw();
    }

    ngAfterViewInit() {
        this.reDraw();
    }

    private reDraw() {
        // console.log(event.target);
        const canvas = this.canvasElementRef.nativeElement as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!this.data || this.data.length < 1) {
            return;
        }

        // console.log(this.canvasContainerElementRef.nativeElement.clientWidth);
        // return;
        // canvas.height = canvas.width = Math.max(this.canvasContainerElementRef.nativeElement.clientWidth - 5, 0);
        canvas.width = Math.max(this.width - 5, 0)
        canvas.height = Math.max(this.height - 5, 0)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        // const startAngle = -Math.PI / 2;
        // const sides = this.data.data.length;
        const radius = (centerX) - this.padding;
        // const jumpRadius = (radius) / this.polygonLength;

        // timer()
        // timer(1000).subscribe(() => {
        //     this.drawArc();
        // });
        // true : 반시계
        // false: 시방향 default
        // ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, this.angleRadian, true);
        // const end = this.angleRadian / 2 - 0.4;
        // const end = this.angleRadian;
        // const end = Math.PI * 2 - 0.5;
        // ctx.arc(canvas.width / 2, canvas.height / 2, radius, Math.PI - end, end, true);
        ctx.save(); // 드로잉 상태를 저정한다.
        ctx.translate(centerX, canvas.height);
        ctx.rotate(Math.PI);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, 0, Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.restore(); // 기존 드로잉 상태를 복구한다.



        // safe zone
        for (let i = 0; i < this.data.length; i++) {
            const data = this.data[i];
            ctx.save(); // 드로잉 상태를 저정한다.
            ctx.fillStyle = data.safeFillStyle;
            ctx.translate(centerX, canvas.height);
            ctx.rotate(Math.PI + ((Math.PI / this.data.length) * i));
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, 0, Math.PI / this.data.length);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore(); // 기존 드로잉 상태를 복구한다.
        }
        // margin arc
        ctx.save(); // 드로잉 상태를 저정한다.
        ctx.fillStyle = '#ffffff';
        ctx.translate(centerX, canvas.height);
        ctx.rotate(Math.PI);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius - 20, 0, Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore(); // 기존 드로잉 상태를 복구한다.


        // none checked
        for (let i = 0; i < this.data.length; i++) {
            const data = this.data[i];
            if (data.checked) {
                continue;
            }
            const color = 230 - (200 / this.data.length) * i;
            ctx.save(); // 드로잉 상태를 저정한다.
            ctx.fillStyle = 'rgb(' + color + ', ' + color + ', ' + color + ')';
            ctx.translate(centerX, canvas.height);
            const rotate = Math.PI + ((Math.PI / this.data.length) * i);
            ctx.rotate(rotate);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius - 80, 0, Math.PI / this.data.length);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            if (i === 0) {
                ctx.rotate(-rotate) ;
                ctx.fillStyle = data.titleStyle;
                ctx.font = '20px Arial';
                ctx.fillText('Hello World', -100, -150);
            }
            ctx.restore(); // 기존 드로잉 상태를 복구한다.
        }

        // checked
        // for (let i = 0; i < this.data.length; i++) {
        //     const data = this.data[i];
        //     if (!data.checked) {
        //         continue;
        //     }
        //     ctx.save(); // 드로잉 상태를 저정한다.
        //     ctx.fillStyle = data.fillStyle;
        //     ctx.translate(centerX, canvas.height);
        //     ctx.rotate(Math.PI + ((Math.PI / this.data.length) * i));
        //     ctx.beginPath();
        //     ctx.moveTo(0, 0);
        //     ctx.arc(0, 0, radius - 40, 0, Math.PI / this.data.length);
        //     ctx.closePath();
        //     ctx.fill();
        //     ctx.stroke();
        //     ctx.restore(); // 기존 드로잉 상태를 복구한다.
        // }

        // margin arc
        // ctx.save(); // 드로잉 상태를 저정한다.
        // ctx.fillStyle = '#ffffff';
        // ctx.translate(centerX, canvas.height);
        // ctx.rotate(Math.PI);
        // ctx.beginPath();
        // ctx.moveTo(0, 0);
        // ctx.arc(0, 0, radius - 100, 0, Math.PI);
        // ctx.closePath();
        // ctx.fill();
        // ctx.stroke();
        // ctx.restore(); // 기존 드로잉 상태를 복구한다.

        // const degree = (Math.PI * 2) / sides; // 각 면에 대한 각도를 계산한다.
        // ctx.save(); // 드로잉 상태를 저정한다.
        // ctx.strokeStyle = this.polygonDataFillStyle;
        // ctx.fillStyle = this.polygonDataFillStyle;
        // ctx.beginPath(); // 경로 그리기 시작
        // ctx.translate(x, y); // 드로잉 좌표 공간을 다각형 중심좌표로 이동한다. context.rotate(startAngle);
        // // 시작 각도를 중심으로 그리도록 하기 위하여 회전한다. context.moveTo(radius, 0); //다각형의 시작 위치로 이동한다.
        // ctx.rotate(startAngle); // 시작 각도를 중심으로 그리도록 하기 위하여 회전한다.
        // ctx.moveTo((radius * data.data[0]) / data.max, 0); // 다각형의 시작 위치로 이동한다.
        // // ctx.lineTo(0, 0);
        // for (let i = 1; i < sides; i++) {// 면의수만큼루프를반복한다
        //     // 다음 꼭지점까지 선을 그린다.
        //     const setRedius = (radius * data.data[i]) / data.max;
        //     // console.log(setRedius);
        //     const sx = setRedius * Math.cos(degree * i);
        //     const sy = setRedius * Math.sin(degree * i);
        //     ctx.lineTo(sx, sy);
        // }
        // ctx.fill();
        // ctx.closePath(); // 패스를 닫는다. context.restore(); //기존 드로잉 상태를 복구한다.
        // ctx.stroke();
        // ctx.restore(); // 기존 드로잉 상태를 복구한다.
    }

    public drawArc() {
        alert(1);
        // const canvas = this.canvasElementRef.nativeElement as HTMLCanvasElement;
        // const ctx = canvas.getContext('2d');
        // const radius = (centerX) - this.padding;
        // ctx.beginPath();
        // // ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, this.angleRadian, true);
        // // const end = this.angleRadian / 2 - 0.4;
        // const end = this.angleRadian;
        // ctx.arc(canvas.width / 2, canvas.height / 2, radius, Math.PI - end, end, true);
        // ctx.stroke();
    }
}
