declare module 'highcharts-react-official' {
  import React from 'react';
  import Highcharts from 'highcharts';

  interface HighchartsReactProps {
    highcharts?: typeof Highcharts;
    constructorType?: string;
    options: Highcharts.Options;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    callback?: (chart: Highcharts.Chart) => void;
    updateArgs?: [boolean, boolean, boolean] | [boolean, boolean];
    allowChartUpdate?: boolean;
    immutable?: boolean;
  }

  declare const HighchartsReact: React.ComponentType<HighchartsReactProps>;
  export default HighchartsReact;
}