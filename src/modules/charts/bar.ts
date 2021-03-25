import * as d3 from "d3";
import { ISettings } from "../components/chart.creator";
import { INumber, IDate } from "../../interfaces/charts.interfaces";

interface IBar {}

export default class Bar implements IBar {
  draw({ data, diagram, x, y, width, height }: ISettings) {
    let bars = diagram.append("g").attr("transform", "translate(10,-5)");
    bars
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .style("mix-blend-mode", "multiply")
      .attr("x", (d: IDate) => x(d.date))
      .attr("y", (d: INumber) => y(d.value))
      .attr("height", (d: INumber) => y(0) - y(d.value))
      .attr("width", width / data.length);
  }
}
