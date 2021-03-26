import * as d3 from "d3";
import { SvgD3Selection } from "../../interfaces/charts.interfaces";

export default class Brush {
  createBrush(width: number, height: number, diagram: SvgD3Selection): void {
    let brush = d3.brushX().extent([
      [0, 0],
      [width, height],
    ]);
    diagram.append("g").attr("class", "brush").call(brush);
  }
}
