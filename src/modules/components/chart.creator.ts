import * as d3 from "d3";
import "./chart.plugins";

import { getChart } from "./chart.register";
import { chartDataConfiguration } from "./data_configuration";
import { createXscale, createYscale } from "./chart.scales";

import { SvgD3Selection } from "../../interfaces/charts.configuration";
import {
  IDataModel,
  IChartConfiguration,
} from "../../interfaces/charts.interface";

interface ICreator {
  data: object[];
  chartConfiguration: IChartConfiguration;
  dataModel: IDataModel;
}

export interface ISettings {
  width?: number;
  height?: number;
  margin: any;
}

export default class Creator implements ICreator {
  data: object[];
  chartConfiguration: IChartConfiguration;
  dataModel: IDataModel;
  svg: SvgD3Selection;

  constructor(
    data: object[],
    chartConfiguration: IChartConfiguration,
    dataModel: IDataModel,
    width?: number,
    height?: number
  ) {
    this.chartConfiguration = chartConfiguration;
    this.dataModel = dataModel;
    this.data = chartDataConfiguration(data, chartConfiguration, dataModel);

    this.defaultSettings(width, height);
  }

  private defaultSettings(width: number, height: number): void {
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
    console.log(svg, this.dataModel, this.chartConfiguration, this.data);

    let x = createXscale(
      this.data,
      settings,
      this.chartConfiguration,
      this.dataModel
    );
    let y = createYscale(this.data, settings, this.chartConfiguration.type);

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

    this.createChart(svg, x, y, settings.width, settings.height);
  }

  private createChart(
    domElement: SvgD3Selection,
    x: d3.ScaleBand<any> | d3.ScaleTime<number, number, never>,
    y: d3.ScaleLinear<number, number, never>,
    width: number,
    height: number
  ): void {
    getChart(this.chartConfiguration.type).draw(
      domElement,
      this.chartConfiguration,
      this.dataModel,
      this.data
    );
  }
}
