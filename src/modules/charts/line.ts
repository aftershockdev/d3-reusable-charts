import { ISettings } from "../components/chart.creator";

interface ILine {}

export default class Line implements ILine {
  constructor() {}
  draw({ data, diagram, x, y, width, height }: ISettings) {}
}
