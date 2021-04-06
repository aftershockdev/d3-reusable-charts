import { ISettings } from "../components/chart.creator";
import { IChart } from "../../interfaces/charts.interface";

interface IDonut extends IChart {}

export default class Donut {
  constructor() {}
  draw({ data, diagram, x, y, width, height }: IDonut) {}
}
