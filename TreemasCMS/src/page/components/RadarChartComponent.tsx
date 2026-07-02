import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
} from 'recharts';

interface RadarChartProps {
    data: Array<{ subject: string; value: number }>;
    color?: string;
    fillOpacity?: number;
    width?: number;
    height?: number;
}

export default function RadarChartComponent({
    data,
    color = '#1f3864',
    fillOpacity = 0.3,
    width = 300,
    height = 250,
}: RadarChartProps) {
    return (
        <ResponsiveContainer width={width} height={height}>
            <RadarChart data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                <Radar
                    dataKey="value"
                    stroke={color}
                    fill={color}
                    fillOpacity={fillOpacity}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
}
