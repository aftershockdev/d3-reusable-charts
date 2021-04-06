import Creator from "./modules/components/chart.creator";
import { data_one } from "./data/data.one";
import { data_two } from "./data/data.two";
import { data_three } from "./data/data.three";
import { DataTypeEnum } from "./interfaces/charts.interface";

let data = [
  { column1: "Jhon", column2: 18 },
  { column1: "Andrew", column2: 55 },
  { column1: "Max", column2: 43 },
];

const chartConfiguration = {
  type: "bar",
  x: "column1",
  y: "column2",
};
const chartConfiguration_one = {
  type: "line",
  x: "Date",
  y: "Cases",
};
const chartConfiguration_two = {
  type: "bar",
  x: "date",
  y: "value",
};
const chartConfiguration_three = {
  type: "line",
  x: "Province",
  y: "Confirmed",
};

const dataModel = [
  {
    columnName: "column1",
    description: "name",
    dataType: DataTypeEnum.string,
  },
  {
    columnName: "column2",
    description: "age",
    dataType: DataTypeEnum.number,
  },
];
const dataModel_one = [
  {
    columnName: "Date",
    description: "date",
    dataType: DataTypeEnum.date,
  },
  {
    columnName: "cases",
    description: "deaths",
    dataType: DataTypeEnum.number,
  },
];
const dataModel_two = [
  {
    columnName: "date",
    description: "date",
    dataType: DataTypeEnum.date,
  },
  {
    columnName: "value",
    description: "sales",
    dataType: DataTypeEnum.number,
  },
];
const dataModel_three = [
  {
    columnName: "Province",
    description: "province name",
    dataType: DataTypeEnum.string,
  },
  {
    columnName: "Confirmed",
    description: "values of confirmed people",
    dataType: DataTypeEnum.number,
  },
];

new Creator(data, chartConfiguration, dataModel);
new Creator(data_one, chartConfiguration_one, dataModel_one);
new Creator(data_two, chartConfiguration_two, dataModel_two);
new Creator(data_three, chartConfiguration_three, dataModel_three);
