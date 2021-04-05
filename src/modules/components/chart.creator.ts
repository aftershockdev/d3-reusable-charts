import * as d3 from "d3";
import "./chart.plugins";

import { SvgD3Selection } from "../../interfaces/charts.interfaces";
import { getChart } from "./chart.register";
import { chartDataConfiguration } from "./chart.configuration";
import { createXscale, createYscale } from "./chart.scales";

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
  [key: string]: any;
  y: d3.ScaleLinear<number, number, never>;
  width: number;
  height: number;
  currentType: string;
}

export default class Creator implements ICreator {
  data: object[];
  config: IConfig;
  dataTypes: ITypes;

  constructor(data: object[], config: IConfig, dataTypes: ITypes) {
    this.config = config;
    this.dataTypes = dataTypes;
    this.data = chartDataConfiguration(data, config, dataTypes);

    this.createSVG();
  }

  private createSVG(): void {
    let defaults = {
      width: 1300,
      height: 600,
      margin: {
        top: 15,
        right: 0,
        bottom: 35,
        left: 60,
      },
    };

    const svg = d3
      .select(".main")
      .append("svg")
      .attr("width", defaults.width)
      .attr("height", defaults.height)
      .attr("overflow", "visible");

    let x = createXscale(this.data, defaults, this.config, this.dataTypes);
    let y = createYscale(this.data, defaults, this.config.type);

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

    let diagram = svg.append("g").attr("class", "axis");

    diagram
      .append("g")
      .attr("class", "x-axis")
      .attr(
        "transform",
        `translate(0,${defaults.height - defaults.margin.bottom})`
      )
      .call(xAxis);

    diagram
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${defaults.margin.left},0)`)
      .call(yAxis);

    const settings = Object.assign(
      {},
      {
        data: this.data,
        diagram,
        x,
        y,
        width: defaults.width,
        height: defaults.height,
        currentType: this.dataTypes[this.config.x].type,
      }
    );

    this.createChart(settings);
  }

  private createChart(settings: ISettings): void {
    getChart(this.config.type).draw(settings);
  }
}
