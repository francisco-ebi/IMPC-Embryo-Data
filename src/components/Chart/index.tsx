import { HeatMapCanvas } from '@nivo/heatmap';
import { ChartData } from '../../models/Charts';

interface ChartProps {
  chartData: ChartData
}

const Chart = ({ chartData }: ChartProps) => (
  <HeatMapCanvas
    width={1400}
    height={(chartData.length * 22) + 165}
    data={chartData}
    margin={{ top: 150, right: 60, bottom: 20, left: 80 }}
    xInnerPadding={0.15}
    yInnerPadding={0.15}
    emptyColor='#EEE'
    colors={{
      type: 'sequential',
      scheme: 'blues',
    }}
    enableLabels={false}
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -45,
      legend: '',
      legendOffset: 46
    }}
    axisRight={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'gene',
      legendPosition: 'middle',
      legendOffset: 40
    }}
    isInteractive={false}
  />
);

export default Chart;