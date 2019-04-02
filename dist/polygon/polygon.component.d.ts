import { AfterViewInit, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class PolygonData {
    data: number[];
    max: number;
}
export declare class PolygonComponent implements OnInit, AfterViewInit, OnChanges {
    private _width;
    private _height;
    private _padding;
    private _data;
    private _polygonLength;
    polygonLineStrokeStyle: string;
    polygonDataFillStyle: string;
    polygonLength: number;
    padding: number;
    data: PolygonData;
    width: number;
    height: number;
    canvasElementRef: ElementRef;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private reDraw;
    private polygonData;
    private polygon;
    private polygonLine;
}
