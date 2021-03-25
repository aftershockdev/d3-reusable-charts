import Creator from "./modules/components/chart.creator";
import { data_one } from "./data/data.one";
import { data_two } from "./data/data.two";
import { data_three } from "./data/data.three";
import { data_four } from "./data/data.four";

//// configuration type and axis
const config = {
  type: "bar",
  x: "Date",
  y: "Cases",
};
const config_two = {
  type: "bar",
  x: "date",
  y: "value",
};
const config_three = {
  type: "bar",
  x: "Province",
  y: "Confirmed",
};
const config_four = {
  type: "bar",
  x: "name",
  y: "efficiency",
};

//// types of data
const data_types = {
  Date: {
    type: "date",
  },
  Cases: {
    type: "number",
  },
};
const data_types_two = {
  date: {
    type: "date",
  },
  value: {
    type: "number",
  },
};
const data_types_three = {
  Province: {
    type: "string",
  },
  Confirmed: {
    type: "number",
  },
};
const data_types_four = {
  name: {
    type: "string",
  },
  y: {
    type: "number",
  },
};

new Creator(data_one, config, data_types);

new Creator(data_three, config_three, data_types_three);

new Creator(data_four, config_four, data_types_four);

new Creator(data_two, config_two, data_types_two);
