import * as d3 from "d3";
import { ISettings } from "../components/chart.creator";
import { INumber } from "../../interfaces/charts.interfaces";

interface IBar {}

export default class Bar implements IBar {
  draw({ data, diagram, x, y, width, height, currentType }: ISettings) {
    let bars = diagram.append("g").attr("transform", "translate(10,-5)");
    bars
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .style("mix-blend-mode", "multiply")
      .attr("x", (d: any, i: number) => {
        return currentType === "date" || currentType === "string"
          ? x(d.date)
          : x(i);
      })
      .attr("y", (d: INumber) => y(d.value))
      .attr("height", (d: INumber) => y(0) - y(d.value))
      .attr("width", (d: INumber) => {
        return currentType === "date" ? width / data.length : x.bandwidth() - 5;
      });
  }
}
