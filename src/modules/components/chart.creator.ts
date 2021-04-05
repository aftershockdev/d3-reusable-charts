import * as d3 from "d3";
import "./chart.plugins";

import { getChart } from "./chart.register";
import { chartDataConfiguration } from "./chart.configuration";
import { createXscale, createYscale } from "./chart.scales";

import { SvgD3Selection } from "../../charts.iconfig/charts.configuration";
import { IChart } from "../../charts.iconfig/charts.interface";

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
  width?: number;
  height?: number;
  margin: any;
}

export default class Creator implements ICreator {
  data: object[];
  config: IConfig;
  dataTypes: ITypes;
  svg: any;

  constructor(
    data: object[],
    config: IConfig,
    dataTypes: ITypes,
    width?: number,
    height?: number
  ) {
    this.config = config;
    this.dataTypes = dataTypes;
    this.data = chartDataConfiguration(data, config, dataTypes);

    this.defaultSettings(width, height);
  }

  private defaultSettings<ISettings>(width: number, height: number): void {
    let settings = {
      width: width ? width : 1300,
      height: height ? height : 600,
      margin: {
        top: 15,
        right: 0,
        bottom: 35,
        left: 60,
      },
    };
    this.createSVG(settings);
  }

  private createSVG(settings: ISettings): void {
    const svg = d3
      .select(".main")
      .append("svg")
      .attr("width", settings.width)
      .attr("height", settings.height)
      .attr("overflow", "visible");

    let x = createXscale(this.data, settings, this.config, this.dataTypes);
    let y = createYscale(this.data, settings, this.config.type);

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

    let diagram = svg.append("g").attr("class", "axis");

    diagram
      .append("g")
      .attr("class", "x-axis")
      .attr(
        "transform",
        `translate(0,${settings.height - settings.margin.bottom})`
      )
      .call(xAxis);

    diagram
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${settings.margin.left},0)`)
      .call(yAxis);

    this.createChart(diagram, x, y, settings.width, settings.height);
  }

  private createChart(
    diagram: SvgD3Selection,
    x: any,
    y: d3.ScaleLinear<number, number, never>,
    width: number,
    height: number
  ): void {
    const chartSettings: IChart = Object.assign(
      {},
      {
        data: this.data,
        diagram,
        x,
        y,
        width: width,
        height: height,
        currentType: this.dataTypes[this.config.x].type,
      }
    );
    getChart(this.config.type).draw(chartSettings);
  }
}
