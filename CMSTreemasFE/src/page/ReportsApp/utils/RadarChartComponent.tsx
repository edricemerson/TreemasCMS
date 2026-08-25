import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  subject: string;
  value: number;
}

interface Props {
  data: DataPoint[];
  color: string;
  fillOpacity?: number;
  width?: number;
  height?: number;
}

export default function RadarChartComponent({
  data,
  color,
  fillOpacity = 0.6,
  width = 500,
  height = 220,
}: Props) {
  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 10, fill: '#333' }}
            tickLine={false}
          />
          <Radar
            name="score"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={fillOpacity}
            dot={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
