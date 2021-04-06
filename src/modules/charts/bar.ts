import * as d3 from "d3";

import { INumber, SvgD3Selection } from "../../interfaces/charts.configuration";
import {
  IChart,
  IChartConfiguration,
  IDataModel,
} from "../../interfaces/charts.interface";

interface IBar extends IChart {}

export default class Bar {
  public draw(
    nodeElement: SvgD3Selection,
    chartConfiguration: IChartConfiguration,
    dataModel: IDataModel,
    data: object[]
  ): void {
    let message = "здесь будет бар чарт";
    nodeElement.append("text").text(message);
    // let currentType = "date";
    // let bars = nodeElement.append("g").attr("transform", "translate(10,-5)");
    // bars
    //   .append("g")
    //   .attr("fill", "steelblue")
    //   .selectAll("rect")
    //   .data(data)
    //   .join("rect")
    //   .style("mix-blend-mode", "multiply")
    //   .attr("x", (d: any, i: number) => {
    //     return currentType === "date" || currentType === "string"
    //       ? x(d.date)
    //       : x(i);
    //   })
    //   .attr("y", (d: INumber) => y(d.value))
    //   .attr("height", (d: INumber) => y(0) - y(d.value))
    //   .attr("width", (d: INumber) => {
    //     return currentType === "date" ? width / data.length : x.bandwidth() - 5;
    //   });
  }
}
