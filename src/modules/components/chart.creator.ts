import * as d3 from "d3";
import "./chart.plugins";

import { SvgD3Selection } from "../../interfaces/charts.interfaces";
import { getChart } from "./chart.register";
import { chartDataConfiguration } from "./chart.configuration";
import { createXscale, createYscale } from "./chart.scales";
import ToolTip from "../ui/chart.tooltip";
import Brush from "../ui/chart.brush";

interface ICreator {
  data: object[];
  config: IConfig;
  dataTypes: ITypes;
}

export interface IConfig {
  type: string;
  x: string;
  y: string;
}

export interface ITypes {
  [key: string]: any;
}

export interface ISettings {
  data: object[];
  diagram: SvgD3Selection;
  x: d3.ScaleTime<number, number, never> | d3.ScaleBand<any>;
  y: d3.ScaleLinear<number, number, never>;
  width: number;
  height: number;
}

export default class Creator implements ICreator {
  data: object[];
  config: IConfig;
  dataTypes: ITypes;
  defaults: any;

  constructor(data: object[], config: IConfig, dataTypes: ITypes) {
    this.config = config;
    this.dataTypes = dataTypes;
    this.data = chartDataConfiguration(data, config, dataTypes);
    this.defaults = {
      width: 1300,
      height: 600,
      margin: {
        top: 15,
        right: 0,
        bottom: 35,
        left: 60,
      },
    };

    this.createSVG();
  }

  private createSVG(): void {
    let { x, y } = this.scales(
      this.data,
      this.defaults,
      this.config,
      this.dataTypes
    );

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

    const svg = d3
      .select(".main")
      .append("svg")
      .attr("width", this.defaults.width)
      .attr("height", this.defaults.height)
      .attr("overflow", "visible");

    let diagram = svg.append("g").attr("class", "axis");

    diagram
      .append("g")
      .attr("class", "x-axis")
      .attr(
        "transform",
        `translate(0,${this.defaults.height - this.defaults.margin.bottom})`
      )
      .call(xAxis);

    diagram
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${this.defaults.margin.left},0)`)
      .call(yAxis);

    const settings = Object.assign(
      {},
      {
        data: this.data,
        diagram,
        x,
        y,
        width: this.defaults.width,
        height: this.defaults.height,
      }
    );

    let tooltip = new ToolTip();
    let brush = new Brush();

    brush.createBrush(this.defaults.width, this.defaults.height, diagram);
    tooltip.createTooltip(diagram, x, y, this.data);

    this.createChart(settings);
  }

  private scales(
    data: object[],
    defaults: object,
    config: IConfig,
    dataTypes: ITypes
  ): any {
    let x = createXscale(data, defaults, config, dataTypes);
    let y = createYscale(data, defaults, config.type);
    return { x, y };
  }

  private createChart(settings: ISettings): void {
    getChart(this.config.type).draw(settings);
  }
}
