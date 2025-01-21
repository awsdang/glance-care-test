import {  Sector } from 'recharts';


/**
 * RenderActiveShape component renders an active shape with additional details
 * such as name, count, and rate percentage.
 *
 * @param {object} props - The properties object.
 * @param {number} props.cx - The x-coordinate of the center of the shape.
 * @param {number} props.cy - The y-coordinate of the center of the shape.
 * @param {number} props.midAngle - The middle angle of the shape.
 * @param {number} props.innerRadius - The inner radius of the shape.
 * @param {number} props.outerRadius - The outer radius of the shape.
 * @param {number} props.startAngle - The starting angle of the shape.
 * @param {number} props.endAngle - The ending angle of the shape.
 * @param {string} props.fill - The fill color of the shape.
 * @param {object} props.payload - The payload object containing additional data.
 * @param {string} props.payload.name - The name to be displayed inside the shape.
 * @param {number} props.percent - The percentage rate to be displayed.
 * @param {number} props.value - The value count to be displayed.
 * @returns {JSX.Element} The rendered active shape component.
 */
export const RenderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'#fff'}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">{`Count ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#ccc">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};
