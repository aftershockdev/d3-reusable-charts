import { ISettings } from "../components/chart.creator";
import { INumber } from "../../interfaces/charts.interfaces";
import * as d3 from "d3";
interface ILine {}

export default class Line implements ILine {
  constructor() {}
  public draw({ data, diagram, x, y, width, height }: ISettings): void {
    const area = diagram.append("g").attr("class", "line");

    area
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line<any>()
          .curve(d3.curveCardinal)
          .x((d: INumber) => x(d.date))
          .y((d: INumber) => y(d.value))
      );
  }
}
