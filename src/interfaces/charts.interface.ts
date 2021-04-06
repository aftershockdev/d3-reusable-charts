import { SvgD3Selection } from "./charts.configuration";

export interface IChart {
  data: object[];
  diagram: SvgD3Selection;
  [key: string]: any;
  y: d3.ScaleLinear<number, number, never>;
  width: number;
  height: number;
  currentType: string;
}

export interface IDataModel {
  [key: number]: IColumnModel;
}

export interface IColumnModel {
  columnName: string;
  description: string;
  dataType: DataTypeEnum;
  length?: number;
  formatString?: string;
}
export interface IChartConfiguration {
  type: string;
  x: string;
  y: string;
}

export enum DataTypeEnum {
  string = "string",
  number = "number",
  date = "date",
}
