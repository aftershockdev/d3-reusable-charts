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
