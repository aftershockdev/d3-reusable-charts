import { ISettings } from "../components/chart.creator";
import { IChart } from "../../charts.iconfig/charts.interface";

interface IDonut extends IChart {}

export default class Donut {
  constructor() {}
  draw({ data, diagram, x, y, width, height }: IDonut) {}
}
