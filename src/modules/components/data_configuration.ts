import {
  IChartConfiguration,
  IDataModel,
} from "../../interfaces/charts.interface";
interface IElement {
  [key: string]: string | number;
}

export const chartDataConfiguration = (
  data: object[],
  chartConfiguration: IChartConfiguration,
  dataModel: IDataModel
): object[] => {
  let configuratedData: object[] = [];

  let columnType: string;

  if (dataModel[0].columnName === chartConfiguration.x) {
    columnType = dataModel[0].dataType;
  }

  if (columnType === "date") {
    let result = data.map((el: IElement) => {
      if (el[chartConfiguration.x] && el[chartConfiguration.y]) {
        const d = {
          date: new Date(el[chartConfiguration.x]),
          value: el[chartConfiguration.y],
        };
        return d;
      }
    });

    configuratedData.push(...result);
  } else {
    let result = data.map((el: IElement) => {
      if (el[chartConfiguration.x] && el[chartConfiguration.y]) {
        const d = {
          date: el[chartConfiguration.x],
          value: el[chartConfiguration.y],
        };
        return d;
      }
    });

    configuratedData.push(...result);
  }

  return configuratedData;
};
