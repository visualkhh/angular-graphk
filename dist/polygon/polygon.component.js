import { Component, ElementRef, Input, ViewChild } from '@angular/core';
var PolygonGraphData = /** @class */ (function () {
    function PolygonGraphData() {
    }
    return PolygonGraphData;
}());
export { PolygonGraphData };
// templateUrl: './polygon.component.html',
// styleUrls: ['./polygon.component.scss']
// template: '<canvas #canvas></canvas>'
var PolygonComponent = /** @class */ (function () {
    function PolygonComponent() {
        this._padding = 5;
        this._polygonLength = 1;
        this.polygonLineStrokeStyle = '#969696';
        this.polygonDataFillStyle = 'rgba(71, 169, 203, 0.5)';
    }
    Object.defineProperty(PolygonComponent.prototype, "polygonLength", {
        get: function () {
            return this._polygonLength;
            // this.reDraw();
        },
        set: function (value) {
            this._polygonLength = value;
            // this.reDraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolygonComponent.prototype, "padding", {
        get: function () {
            return this._padding;
        },
        set: function (value) {
            this._padding = value;
            // this.reDraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolygonComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            // this.reDraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolygonComponent.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            // this.reDraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolygonComponent.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            // this.reDraw();
        },
        enumerable: true,
        configurable: true
    });
    PolygonComponent.prototype.ngOnChanges = function (changes) {
        this.reDraw();
    };
    PolygonComponent.prototype.ngOnInit = function () {
        this.reDraw();
    };
    PolygonComponent.prototype.ngAfterViewInit = function () {
        this.reDraw();
    };
    PolygonComponent.prototype.reDraw = function () {
        // console.log(event.target);
        var canvas = this.canvasElementRef.nativeElement;
        var ctx = canvas.getContext('2d');
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!this.data || !this.data.data || this.data.data.length < 3) {
            return;
        }
        // console.log(this.canvasContainerElementRef.nativeElement.clientWidth);
        // return;
        // canvas.height = canvas.width = Math.max(this.canvasContainerElementRef.nativeElement.clientWidth - 5, 0);
        canvas.width = Math.max(this.width - 5, 0);
        canvas.height = Math.max(this.height - 5, 0);
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var startAngle = -Math.PI / 2;
        var sides = this.data.data.length;
        var radius = (centerX) - this.padding;
        var jumpRadius = (radius) / this.polygonLength;
        this.polygonLine(ctx, centerX, centerY, radius, sides, startAngle);
        for (var i = 1; i <= this.polygonLength; i++) {
            this.polygon(ctx, centerX, centerY, jumpRadius * i, sides, startAngle);
        }
        this.polygonData(ctx, centerX, centerY, this.data, radius, startAngle);
        // ctx.beginPath();
        // ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.beginPath(); //경로 그리기 시작
        // ctx.moveTo(canvas.width / 2, canvas.height / 2); //기준 좌표값 이동
        // context.translate(x, y);
        // ctx.lineTo(100,100); // X, Y 좌표를 사용하여 선 그리기
        // ctx.lineTo(200,100); // X, Y 좌표를 사용하여 선 그리기
        // ctx.fill(); //경로 그리기 종료(채움)
        // ctx.beginPath(); //경로 그리기 시작
        // ctx.moveTo(50, 50); //기준 좌표값 이동
        // ctx.lineTo(200,50); // X, Y 좌표를 사용하여 선 그리기
        // ctx.lineTo(50,200);
        // ctx.fill(); //경로 그리기 종료(채움)
    };
    PolygonComponent.prototype.polygonData = function (ctx, x, y, data, radius, startAngle) {
        var sides = data.data.length;
        if (sides < 3) {
            return;
        } // 3각형 이하는 그리지 않도록 한다.
        // A:B = C:X    => 30:50 = 33 : x
        // 30X = 50*33
        // X = BC / 30
        // max:radius = val:?
        // max*? = radius*val
        // ? = radius*val / max;
        var degree = (Math.PI * 2) / sides; // 각 면에 대한 각도를 계산한다.
        ctx.save(); // 드로잉 상태를 저정한다.
        ctx.strokeStyle = this.polygonDataFillStyle;
        ctx.fillStyle = this.polygonDataFillStyle;
        ctx.beginPath(); // 경로 그리기 시작
        ctx.translate(x, y); // 드로잉 좌표 공간을 다각형 중심좌표로 이동한다. context.rotate(startAngle);
        // 시작 각도를 중심으로 그리도록 하기 위하여 회전한다. context.moveTo(radius, 0); //다각형의 시작 위치로 이동한다.
        ctx.rotate(startAngle); // 시작 각도를 중심으로 그리도록 하기 위하여 회전한다.
        ctx.moveTo((radius * data.data[0]) / data.max, 0); // 다각형의 시작 위치로 이동한다.
        // ctx.lineTo(0, 0);
        for (var i = 1; i < sides; i++) { // 면의수만큼루프를반복한다
            // 다음 꼭지점까지 선을 그린다.
            var setRedius = (radius * data.data[i]) / data.max;
            console.log(setRedius);
            var sx = setRedius * Math.cos(degree * i);
            var sy = setRedius * Math.sin(degree * i);
            ctx.lineTo(sx, sy);
        }
        ctx.fill();
        ctx.closePath(); // 패스를 닫는다. context.restore(); //기존 드로잉 상태를 복구한다.
        ctx.stroke();
        ctx.restore(); // 기존 드로잉 상태를 복구한다.
    };
    PolygonComponent.prototype.polygon = function (ctx, x, y, radius, sides, startAngle) {
        if (sides < 3) {
            return;
        } // 3각형 이하는 그리지 않도록 한다.
        var degree = (Math.PI * 2) / sides; // 각 면에 대한 각도를 계산한다.
        ctx.save(); // 드로잉 상태를 저정한다.
        ctx.strokeStyle = this.polygonLineStrokeStyle;
        ctx.beginPath(); // 경로 그리기 시작
        ctx.translate(x, y); // 드로잉 좌표 공간을 다각형 중심좌표로 이동한다. context.rotate(startAngle); //시작 각도를 중심으로 그리도록 하기 위하여 회전한다. context.moveTo(radius, 0); //다각형의 시작 위치로 이동한다.
        ctx.rotate(startAngle); // 시작 각도를 중심으로 그리도록 하기 위하여 회전한다.
        ctx.moveTo(radius, 0); // 다각형의 시작 위치로 이동한다.
        // ctx.lineTo(0, 0);
        for (var i = 1; i < sides; i++) { // 면의수만큼루프를반복한다
            // 다음 꼭지점까지 선을 그린다.
            var sx = radius * Math.cos(degree * i);
            var sy = radius * Math.sin(degree * i);
            ctx.lineTo(sx, sy);
        }
        // ctx.fill();
        ctx.closePath(); // 패스를 닫는다. context.restore(); //기존 드로잉 상태를 복구한다.
        ctx.stroke();
        // ctx.beginPath(); // 경
        // ctx.arc(radius, 0, 50, 0, 2 * Math.PI);
        // ctx.stroke();
        // for (let i = 1; i < sides; i++) {// 면의수만큼루프를반복한다
        //     // 다음 꼭지점까지 선을 그린다.
        //     ctx.beginPath(); // 경
        //     const sx = radius * Math.cos(degree * i);
        //     const sy = radius * Math.sin(degree * i)
        //     ctx.arc(sx, sy, 50, 0, 2 * Math.PI);
        //     ctx.closePath();
        //     ctx.stroke();
        // }
        ctx.restore(); // 기존 드로잉 상태를 복구한다.
    };
    PolygonComponent.prototype.polygonLine = function (ctx, x, y, radius, sides, startAngle) {
        if (sides < 3) {
            return;
        } // 3각형 이하는 그리지 않도록 한다.
        var degree = (Math.PI * 2) / sides; // 각 면에 대한 각도를 계산한다.
        ctx.save(); // 드로잉 상태를 저정한다.
        ctx.strokeStyle = this.polygonLineStrokeStyle;
        ctx.translate(x, y); // 드로잉 좌표 공간을 다각형 중심좌표로 이동한다. context.rotate(startAngle);
        // 시작 각도를 중심으로 그리도록 하기 위하여 회전한다. context.moveTo(radius, 0); //다각형의 시작 위치로 이동한다.
        ctx.rotate(startAngle); // 시작 각도를 중심으로 그리도록 하기 위하여 회전한다.
        ctx.beginPath(); // 경로 그리기 시작
        ctx.moveTo(radius, 0); // 다각형의 시작 위치로 이동한다.
        ctx.lineTo(0, 0);
        // ctx.lineTo(100, 20);
        // ctx.closePath();
        ctx.stroke();
        // ctx.closePath();
        for (var i = 1; i < sides; i++) { // 면의수만큼루프를반복한다
            // 다음 꼭지점까지 선을 그린다.
            // ctx.beginPath(); // 경
            var sx = radius * Math.cos(degree * i);
            var sy = radius * Math.sin(degree * i);
            ctx.moveTo(sx, sy); // 다각형의 시작 위치로 이동한다.
            ctx.lineTo(0, 0);
            // ctx.closePath();
            ctx.stroke();
        }
        ctx.restore(); // 기존 드로잉 상태를 복구한다.
    };
    PolygonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'graphk-polygon',
                    templateUrl: './polygon.component.html',
                    styleUrls: ['./polygon.component.scss']
                },] },
    ];
    /** @nocollapse */
    PolygonComponent.ctorParameters = function () { return []; };
    PolygonComponent.propDecorators = {
        polygonLineStrokeStyle: [{ type: Input }],
        polygonLength: [{ type: Input }],
        padding: [{ type: Input }],
        data: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        canvasElementRef: [{ type: ViewChild, args: ['canvas',] }]
    };
    return PolygonComponent;
}());
export { PolygonComponent };
//# sourceMappingURL=polygon.component.js.map