import * as d3 from "d3";
import "./chart.plugins";

import { IValue, SvgD3Selection } from "../../interfaces/charts.interfaces";
import { getChart } from "./chart.register";
import { chartDataConfiguration } from "./chart.configuration";

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
  x: d3.ScaleBand<string>;
  y: d3.ScaleLinear<number, number, never>;
  width: number;
  height: number;
}

export default class Creator implements ICreator {
  data: object[];
  config: IConfig;
  dataTypes: ITypes;

  constructor(data: object[], config: IConfig, dataTypes: ITypes) {
    this.config = config;
    this.dataTypes = dataTypes;
    this.data = chartDataConfiguration(data, dataTypes);

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

    let x = d3
      .scaleBand()
      .domain(<any>d3.range(this.data.length))
      .range([defaults.margin.left, defaults.width - defaults.margin.right]);

    let y = d3
      .scaleLinear()
      .domain(<any>[0, d3.max(this.data, (d: IValue) => d.value)])
      .nice()
      .range([defaults.height - defaults.margin.bottom, defaults.margin.top]);

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
      }
    );

    this.createChart(settings);
  }

  private createChart(settings: ISettings): void {
    getChart(this.config.type).draw(settings);
  }
}
