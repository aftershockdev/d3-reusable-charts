import Creator from "./modules/components/chart.creator";
import { data_four } from "./data/data.four";

const config = {
  type: "bar",
  x: "name",
  y: "efficiency",
};

const data_types = {
  name: {
    type: "string",
  },
  efficiency: {
    type: "number",
  },
};

new Creator(data_four, config, data_types);
