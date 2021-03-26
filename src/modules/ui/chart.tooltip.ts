import * as d3 from "d3";
import { ITooltip, SvgD3Selection } from "../../interfaces/charts.interfaces";

export default class Tooltip {
  public createTooltip(
    diagram: SvgD3Selection,
    x: d3.ScaleTime<number, number, never> | d3.ScaleBand<any>,
    y: d3.ScaleLinear<number, number, never>,
    data: object[]
  ): void {
    let focus = diagram
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus
      .append("rect")
      .attr("class", "tooltip")
      .attr("width", 100)
      .attr("height", 50)
      .attr("fill", "grey")
      .attr("x", 10)
      .attr("y", -22)
      .attr("rx", 4)
      .attr("ry", 4);

    focus
      .append("text")
      .attr("class", "tooltip-date")
      .attr("x", 30)
      .attr("y", 20);

    focus
      .append("text")
      .attr("class", "tooltip-likes")
      .attr("x", 30)
      .attr("y", 0);

    // need to create the new universal tooltip for any type of scales (ScaleTime, ScaleBand, ScaleLinear)

    // function mousemove(): void {
    //   let x0 = x.invert<any>(d3.pointer(event, this)[0]),
    //     i = <any>bisectDate(data, x0, 1),
    //     d0: ITooltip = data[i - 1],
    //     d1: ITooltip = data[i],
    //     d: any = x0 - d0.date > d1.date - x0 ? d1 : d0;
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
