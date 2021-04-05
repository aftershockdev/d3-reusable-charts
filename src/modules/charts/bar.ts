import * as d3 from "d3";

import { INumber } from "../../charts.iconfig/charts.configuration";
import { IChart } from "../../charts.iconfig/charts.interface";

interface IBar extends IChart {}

export default class Bar {
  public draw({ data, diagram, x, y, width, height, currentType }: IBar): void {
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
