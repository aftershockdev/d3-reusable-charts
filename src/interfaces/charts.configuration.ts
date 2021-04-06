import { NumberValue } from "d3-scale";
import { Selection } from "d3-selection";

export interface AccessorFunction {
  (dataObject: any): any;
}

export interface TextFunction {
  (dataObject: any): string;
}

export interface InteractionFunction {
  (pointArray: Array<any>): void;
}

export interface EmptyInteractionFunction {
  (): void;
}

export interface DefinedFunction {
  (dataObject: any): boolean;
}

export interface IValue {
  value: string;
}
export interface IDate {
  date: string;
}
export interface INumber {
  [key: string]: number | NumberValue;
}

export type GenericD3Selection = Selection<any, any, any, any>;
export type SvgD3Selection = Selection<SVGElement, any, Element, any>;
export type GD3Selection = Selection<SVGGElement, any, Element, any>;
export type LineD3Selection = Selection<SVGLineElement, any, Element, any>;
export type TextD3Selection = Selection<SVGTextElement, any, Element, any>;
