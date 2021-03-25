import { registerChart } from "./chart.register";

import Bar from "../charts/bar";
import Line from "../charts/line";
import Donut from "../charts/donut";

registerChart("bar", new Bar());
registerChart("line", new Line());
registerChart("donut", new Donut());
