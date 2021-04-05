import { ISettings } from "../components/chart.creator";
import { INumber } from "../../interfaces/charts.interfaces";
import * as d3 from "d3";
interface ILine {}

export default class Line implements ILine {
  constructor() {}
  draw({ data, diagram, x, y, width, height, currentType }: ISettings) {
    const bisectDate = d3.bisector((d: any) => d.date).left;
    const dateFormatter = d3.timeFormat("%Y/%m/%d");
    const area = diagram.append("g").attr("class", "line");

    let focus = diagram
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

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
          .x((d: INumber, i: number) => {
            return currentType === "date" || currentType === "string"
              ? x(d.date)
              : x(i);
          })
          .y((d: INumber) => y(d.value))
      );
    // let brush = d3.brushX().extent([
    //   [0, 0],
    //   [width, height],
    // ]);

    // area.append("g").attr("class", "brush").call(brush);
    // focus
    //   .append("rect")
    //   .attr("class", "tooltip")
    //   .attr("width", 100)
    //   .attr("height", 50)
    //   .attr("fill", "grey")
    //   .attr("x", 10)
    //   .attr("y", -22)
    //   .attr("rx", 4)
    //   .attr("ry", 4);

    // focus
    //   .append("text")
    //   .attr("class", "tooltip-date")
    //   .attr("x", 30)
    //   .attr("y", 20);

    // focus
    //   .append("text")
    //   .attr("class", "tooltip-likes")
    //   .attr("x", 30)
    //   .attr("y", 0);

    // function mousemove(): void {
    //   let x0: any = x.invert(d3.pointer(event, this)[0]),
    //     i = bisectDate(data, x0, 1),
    //     d0 = data[i - 1],
    //     d1 = data[i],
    //     d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    //   focus.attr(
    //     "transform",
    //     "translate(" + x(d.date) + "," + y(d.value) + ")"
    //   );
    //   focus.select(".tooltip-date").text(dateFormatter(d.date));
    //   focus.select(".tooltip-likes").text(d.value);
    // }

    // diagram
    //   .on("mouseover", function (): void {
    //     focus.style("display", null);
    //   })
    //   .on("mouseout", function (): void {
    //     focus.style("display", "none");
    //   })
    //   .on("mousemove", mousemove);
  }
}
