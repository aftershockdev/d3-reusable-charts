import { ISettings } from "../components/chart.creator";

interface IDonut {}

export default class Donut implements IDonut {
  constructor() {}
  draw({ data, diagram, x, y, width, height }: ISettings) {}
}
