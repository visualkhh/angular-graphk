import { AfterViewInit, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GaugeStepData } from './GaugeStepData';
export declare class GaugeStepComponent implements OnInit, AfterViewInit, OnChanges {
    width: number;
    height: number;
    padding: number;
    data: GaugeStepData[];
    canvasElementRef: ElementRef;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private reDraw;
    drawArc(): void;
}
