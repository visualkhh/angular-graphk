import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
var GaugeStepData = /** @class */ (function () {
    function GaugeStepData() {
        this.safe = false;
        this.safeFillStyle = 'rgba(71, 169, 203, 0.5)';
        this.title = '';
        this.checked = false;
        // titleStyle = '#c3c3c3';
        this.titleStyle = '#ffffff';
        this.fillStyle = '#fdd30e';
    }
    return GaugeStepData;
}());
export { GaugeStepData };
// templateUrl: './polygon.component.html',
// styleUrls: ['./polygon.component.scss']
// template: '<canvas #canvas></canvas>'
// 1.0.3
var GaugeStepComponent = /** @class */ (function () {
    function GaugeStepComponent() {
        this.padding = 5;
    }
    GaugeStepComponent.prototype.ngOnChanges = function (changes) {
        this.reDraw();
    };
    GaugeStepComponent.prototype.ngOnInit = function () {
        this.reDraw();
    };
    GaugeStepComponent.prototype.ngAfterViewInit = function () {
        this.reDraw();
    };
    // 퍼센트 계산법 공식과 간단한 예제입니다.
    //
    // 전체값에서 일부값은 몇 퍼센트? 계산법 공식
    // 일부값 ÷ 전체값 X 100
    // 예제) 300에서 105는 몇퍼센트?
    // 답: 35%
    //
    //
    // 전체값의 몇 퍼센트는 얼마? 계산법 공식
    // 전체값 X 퍼센트 ÷ 100
    // 예제) 300의 35퍼센트는 얼마?
    // 답) 105
    //
    //
    // 숫자를 몇 퍼센트 증가시키는 공식
    // 숫자 X (1 + 퍼센트 ÷ 100)
    // 예제) 1548을 66퍼센트 증가하면?
    // 답) 2569.68
    //
    //
    // 숫자를 몇 퍼센트 감소하는 공식
    // 숫자 X (1 - 퍼센트 ÷ 100)
    // 예제) 1548을 66퍼센트 감소하면?
    // 답) 526.32
    GaugeStepComponent.prototype.reDraw = function () {
        // console.log('onDraw');
        var canvas = this.canvasElementRef.nativeElement;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!this.data || this.data.length < 1) {
            return;
        }
        // console.log(this.canvasContainerElementRef.nativeElement.clientWidth);
        // return;
        // canvas.height = canvas.width = Math.max(this.canvasContainerElementRef.nativeElement.clientWidth - 5, 0);
        canvas.width = Math.max(this.width - 5, 0);
        canvas.height = Math.max(this.height - 5, 0);
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        // const startAngle = -Math.PI / 2;
        // const sides = this.data.data.length;
        var radius = (centerX) - this.padding;
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
        // 가이드라인
        ctx.save(); // 드로잉 상태를 저정한다.
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = '#c3c3c3';
        ctx.translate(centerX, canvas.height);
        ctx.rotate(Math.PI);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, 0, Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.restore(); // 기존 드로잉 상태를 복구한다.
        // 전체값의 몇 퍼센트는 얼마? 계산법 공식
        // 전체값 X 퍼센트 ÷ 100
        var applyRadius = (radius * 100) / 100;
        // safe zone
        for (var i = 0; i < this.data.length; i++) {
            var data = this.data[i];
            if (!data.safe) {
                continue;
            }
            ctx.save(); // 드로잉 상태를 저정한다.
            ctx.fillStyle = data.safeFillStyle;
            ctx.lineWidth = 0.1;
            ctx.strokeStyle = '#c3c3c3';
            ctx.translate(centerX, canvas.height);
            ctx.rotate(Math.PI + ((Math.PI / this.data.length) * i));
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, applyRadius, 0, Math.PI / this.data.length);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore(); // 기존 드로잉 상태를 복구한다.
        }
        applyRadius = (radius * 95) / 100;
        // margin arc
        ctx.save(); // 드로잉 상태를 저정한다.
        ctx.fillStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#c3c3c3';
        ctx.shadowColor = '#c3c3c3';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
        ctx.translate(centerX, canvas.height);
        ctx.rotate(Math.PI);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, applyRadius, 0, Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore(); // 기존 드로잉 상태를 복구한다.
        applyRadius = (radius * 85) / 100;
        // none checked
        for (var i = 0; i < this.data.length; i++) {
            var data = this.data[i];
            if (data.checked) {
                continue;
            }
            var color = 230 - (150 / this.data.length) * i;
            ctx.save(); // 드로잉 상태를 저정한다.
            ctx.fillStyle = 'rgb(' + color + ', ' + color + ', ' + color + ')';
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#c3c3c3';
            ctx.translate(centerX, canvas.height);
            var rotate = Math.PI + ((Math.PI / this.data.length) * i);
            ctx.rotate(rotate);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, applyRadius, 0, Math.PI / this.data.length);
            ctx.closePath();
            ctx.fill();
            // ctx.stroke();
            ctx.restore(); // 기존 드로잉 상태를 복구한다.
        }
        applyRadius = (radius * 95) / 100;
        // checked
        for (var i = 0; i < this.data.length; i++) {
            var data = this.data[i];
            if (!data.checked) {
                continue;
            }
            ctx.save(); // 드로잉 상태를 저정한다.
            ctx.fillStyle = data.fillStyle;
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#c3c3c3';
            ctx.shadowColor = '#666666';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 1;
            ctx.translate(centerX, canvas.height);
            ctx.rotate(Math.PI + ((Math.PI / this.data.length) * i));
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, applyRadius, 0, Math.PI / this.data.length);
            ctx.closePath();
            ctx.fill();
            // ctx.stroke();
            ctx.restore(); // 기존 드로잉 상태를 복구한다.
        }
        applyRadius = (radius * 60) / 100;
        for (var i = 0; i < this.data.length; i++) {
            var data = this.data[i];
            ctx.save(); // 드로잉 상태를 저정한다.
            ctx.fillStyle = data.titleStyle;
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#c3c3c3';
            ctx.shadowColor = '#999999';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 1;
            // title
            // ctx.font = '20px Arial';
            // console.log((Math.PI / this.data.length));
            // ctx.font = ((Math.PI / (this.data.length))  + (this.width / this.data.length)) + 'px Arial';
            ctx.font = (((this.width / this.data.length)) * 20 / 100) + 'px Arial';
            ctx.textAlign = 'center';
            ctx.translate(centerX, canvas.height);
            // ctx.font = ((this.width / this.data.length) - 100) + 'px Arial';
            // const rotate = ((Math.PI / this.data.length) * i);
            // let rotate = (Math.PI * 1.5) + ((Math.PI / this.data.length) * i) + ((Math.PI / this.data.length) * i) / 2;
            var rotate = (-Math.PI / 2); // 초기각도셋팅
            ctx.rotate(rotate);
            ctx.rotate(((Math.PI / this.data.length) * i)); // 글자 초기각도 셋팅
            ctx.rotate((Math.PI / this.data.length) / 2); // 글자 cneter 셋팅
            // let rotate = (Math.PI * 1.5);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.strokeText(data.title, 0, -applyRadius);
            ctx.fillText(data.title, 0, -applyRadius);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore(); // 기존 드로잉 상태를 복구한다.
        }
        applyRadius = (radius * 50) / 100;
        // arrow
        for (var i = 0; i < this.data.length; i++) {
            var data = this.data[i];
            if (!data.checked) {
                continue;
            }
            ctx.save(); // 드로잉 상태를 저정한다.
            ctx.fillStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#ffffff';
            ctx.shadowColor = '#c3c3c3';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 4;
            // ctx.font = '20px Arial';
            // ctx.font = ((this.width / this.data.length) - 100) + 'px Arial';
            console.log((Math.PI / this.data.length));
            ctx.font = ((Math.PI / this.data.length) / 2 * (this.width / this.data.length)) + 'px Arial';
            ctx.textAlign = 'center';
            ctx.translate(centerX, canvas.height);
            // const rotate = ((Math.PI / this.data.length) * i);
            // let rotate = (Math.PI * 1.5) + ((Math.PI / this.data.length) * i) + ((Math.PI / this.data.length) * i) / 2;
            // let rotate = (Math.PI * 1.5);
            var rotate = (-Math.PI / 2); // 초기각도셋팅
            ctx.rotate(rotate);
            ctx.rotate(((Math.PI / this.data.length) * i)); // 글자 초기각도 셋팅
            ctx.rotate((Math.PI / this.data.length) / 2); // 글자 cneter 셋팅
            ctx.beginPath();
            var scale = ((Math.PI / this.data.length) / 2 * (this.width / this.data.length));
            ctx.moveTo(-scale, 0);
            ctx.lineTo(0, -applyRadius);
            ctx.lineTo(scale, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore(); // 기존 드로잉 상태를 복구한다.
        }
        applyRadius = (radius * 40) / 100;
        // margin arc
        ctx.save(); // 드로잉 상태를 저정한다.
        ctx.fillStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#ffffff';
        ctx.shadowColor = '#c3c3c3';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
        ctx.translate(centerX, canvas.height);
        ctx.rotate(Math.PI);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, applyRadius, 0, Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore(); // 기존 드로잉 상태를 복구한다.
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
    };
    GaugeStepComponent.prototype.drawArc = function () {
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
    };
    GaugeStepComponent.decorators = [
        { type: Component, args: [{
                    selector: 'graphk-gaugeStep',
                    template: '<canvas #canvas></canvas>',
                },] },
    ];
    /** @nocollapse */
    GaugeStepComponent.ctorParameters = function () { return []; };
    GaugeStepComponent.propDecorators = {
        width: [{ type: Input }],
        height: [{ type: Input }],
        padding: [{ type: Input }],
        data: [{ type: Input }],
        canvasElementRef: [{ type: Output }, { type: ViewChild, args: ['canvas',] }]
    };
    return GaugeStepComponent;
}());
export { GaugeStepComponent };
//# sourceMappingURL=gaugeStep.component.js.map