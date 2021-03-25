export interface AccessorFunction {
  (dataObject: any): any;
}
export interface TextFunction {
  (dataObject: any): string;
}
export interface InteractionFunction {
  (pointArray: Array<any>): void;
}
