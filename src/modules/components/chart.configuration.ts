import { ITypes, IConfig } from "./chart.creator";

interface IElement {
  [key: string]: string | number;
}

export const chartDataConfiguration = (
  data: object[],
  config: IConfig,
  dataTypes: ITypes
): object[] => {
  let configuratedData: object[] = [];

  if (dataTypes[config.x].type === "date") {
    let result = data.map((el: IElement) => {
      if (el[config.x] && el[config.y]) {
        const d = {
          date: new Date(el[config.x]),
          value: el[config.y],
        };
        return d;
      }
    });

    configuratedData.push(...result);
  } else {
    let result = data.map((el: IElement) => {
      if (el[config.x] && el[config.y]) {
        const d = {
          date: el[config.x],
          value: el[config.y],
        };
        return d;
      }
    });

    configuratedData.push(...result);
  }

  return configuratedData;
};
