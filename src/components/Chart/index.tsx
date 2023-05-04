import { HeatMapCanvas, HeatMapDatum, ComputedCell } from '@nivo/heatmap';
import { ChartData } from '../../models/Charts';
import dataService from '../../services/data-service';

interface ChartProps {
  chartData: ChartData,
  counts: { max: number, min: number }
}

interface CustomTooltipProps {
  cell: ComputedCell<HeatMapDatum>;
}

const CustomTooltip = ({ cell }: CustomTooltipProps) => (
  <div style={{
    backgroundColor: '#fff',
    color: '#000',
    padding: '6px 9px',
    borderRadius: '2px',
    minWidth: '160px',
    boxShadow: '0 3px 5px rgba(0, 0, 0, .25)',
    whiteSpace: 'pre',
  }}>
    <span>
      {cell.serieId} - {cell.data.x}: <b>{cell.formattedValue}</b><br />
      <span>
        MGI gene identifier: <b>{dataService.getGeneInfo(cell.serieId).id}</b>
      </span>
      <br />
      { !!dataService.getProcedures(cell.serieId, cell.data.x as string).length && (
        <span>Procedures: </span>
      )}
      <ul>
        {dataService.getProcedures(cell.serieId, cell.data.x as string).map(procedure => (
          <li>{procedure}</li>
        ))}
      </ul>
    </span>
  </div>
)


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
        tooltip={CustomTooltip}
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
          tooltip={CustomTooltip}
        />
      ))}
    </div>
  )
};

export default Chart;