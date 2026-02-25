interface DataPoint {
    label: string;
    value: number;
}

interface AreaChartProps {
    data: DataPoint[];
    color?: string;
    height?: number;
    showLabels?: boolean;
}

export function AreaChart({ data, color = '#10b981', height = 200, showLabels = true }: AreaChartProps) {
    if (!data?.length) return null;

    const max = Math.max(...data.map(d => d.value), 1);
    const width = 1000; // Reference width for SVG coordinate space
    const stepX = width / (data.length - 1);

    // Generate points for the path
    const points = data.map((d, i) => ({
        x: i * stepX,
        y: height - (d.value / max) * (height - 20) - 10
    }));

    const pathData = `M ${points[0].x} ${points[0].y} ` +
        points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');

    const areaData = `${pathData} L ${points[points.length - 1].x} ${height} L 0 ${height} Z`;

    return (
        <div className="w-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="areaGradientUser" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Area */}
                <path d={areaData} fill="url(#areaGradientUser)" />

                {/* Line */}
                <path d={pathData} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                {/* Points */}
                {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="6" fill="white" stroke={color} strokeWidth="3" />
                ))}
            </svg>
            {showLabels && (
                <div className="flex justify-between mt-3 px-1">
                    {data.map((d, i) => (
                        <span key={i} className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{d.label}</span>
                    ))}
                </div>
            )}
        </div>
    );
}

interface BarChartProps {
    data: { label: string; value1: number; value2?: number }[];
    color1?: string;
    color2?: string;
    height?: number;
}

export function BarChart({ data, color1 = '#10b981', color2 = '#a7f3d0' }: BarChartProps) {
    const max = Math.max(...data.map(d => Math.max(d.value1, d.value2 || 0)), 1);

    return (
        <div className="flex items-end gap-3 h-full w-full">
            {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="relative w-full flex justify-center gap-1 items-end h-full">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                            {d.value1} {d.value2 !== undefined ? `/ ${d.value2}` : ''}
                        </div>

                        <div
                            className="w-full max-w-[12px] rounded-t-sm transition-all duration-500"
                            style={{ height: `${(d.value1 / max) * 100}%`, backgroundColor: color1 }}
                        />
                        {d.value2 !== undefined && (
                            <div
                                className="w-full max-w-[12px] rounded-t-sm transition-all duration-500"
                                style={{ height: `${(d.value2 / max) * 100}%`, backgroundColor: color2 }}
                            />
                        )}
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{d.label}</span>
                </div>
            ))}
        </div>
    );
}

interface DonutChartProps {
    data: { label: string; value: number; color: string }[];
    size?: number;
}

export function DonutChart({ data, size = 160 }: DonutChartProps) {
    const total = data.reduce((acc, d) => acc + d.value, 0);
    let currentAngle = 0;
    const radius = 70;
    const strokeWidth = 20;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="flex items-center gap-8">
            <div className="relative" style={{ width: size, height: size }}>
                <svg viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                    {data.map((d, i) => {
                        const percentage = (d.value / total) * 100;
                        const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                        const strokeDashoffset = -currentAngle;
                        currentAngle += (percentage / 100) * circumference;

                        return (
                            <circle
                                key={i}
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="transparent"
                                stroke={d.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-700"
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-gray-900">{total}</span>
                    <span className="text-[10px] font-semibold text-gray-500 uppercase">Total</span>
                </div>
            </div>

            <div className="space-y-2">
                {data.map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                        <div>
                            <p className="text-xs font-bold text-gray-900">{d.label}</p>
                            <p className="text-[10px] text-gray-500">{((d.value / total) * 100).toFixed(1)}% ({d.value})</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
