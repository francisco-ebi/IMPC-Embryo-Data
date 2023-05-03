import { HeatMapCanvas } from '@nivo/heatmap';
import { ChartData } from '../../models/Charts';

interface ChartProps {
  chartData: ChartData,
  counts: { max: number, min: number }
}

const Chart = ({ chartData, counts }: ChartProps) => {
  if (!chartData.length) {
    return null;
  }
  const firstItem = [chartData[0]];
  const restOfItems = chartData.slice(1);
  return (
    <div className="chart-wrapper">
      <HeatMapCanvas
        width={1400}
        height={172}
        data={firstItem}
        margin={{ top: 150, right: 60, left: 80 }}
        xInnerPadding={0.15}
        yInnerPadding={0.15}
        emptyColor='#EEE'
        colors={{
          type: 'sequential',
          scheme: 'blues',
          minValue: counts.min,
          maxValue: counts.max,
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
        }}
      />
      {restOfItems.map(item => (
        <HeatMapCanvas
          key={item.id}
          width={1400}
          height={22}
          data={[item]}
          margin={{ right: 60, left: 80 }}
          xInnerPadding={0.15}
          yInnerPadding={0.15}
          emptyColor='#EEE'
          colors={{
            type: 'sequential',
            scheme: 'blues',
            minValue: counts.min,
            maxValue: counts.max,
          }}
          enableLabels={false}
          axisTop={null}
          axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
        />
      ))}
    </div>
  )
};

export default Chart;