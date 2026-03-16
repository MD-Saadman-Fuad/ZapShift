import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Cell, Legend, Pie, PieChart, Sector, Tooltip } from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const pieData = (data) => {
    return data.map(stat => ({ name: stat._id, value: stat.count }));
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
        return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
    const pct = ((percent ?? 1) * 100).toFixed(0);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
            <tspan x={x} dy="-0.5em">{name}</tspan>
            <tspan x={x} dy="1.2em">{pct}%</tspan>
        </text>
    );
};

const renderLegend = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }}>{value}</span>;
};

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { data: deliveryStats = [] } = useQuery({
        queryKey: ['delivery-status/stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/delivery-status/stats');
            const data = await res.data;
            return data;
        }
    });

    return (
        <div>
            <h2 className='text-4xl'>Admin Dashboard Home</h2>
            <div className="stats shadow">
                {
                    deliveryStats.map(stat => (
                        <div className="stat" key={stat._id}>
                            <div className="stat-figure text-secondary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-8 w-8 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="stat-title">{stat._id}</div>
                            <div className="stat-value">{stat.count}</div>
                            <div className="stat-desc">Jan 1st - Feb 1st</div>
                        </div>
                    ))
                }
            </div>

            <PieChart width={500} height={400}>
                <Pie
                    data={pieData(deliveryStats)}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    dataKey="value"
                >
                    {pieData(deliveryStats).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend formatter={renderLegend} />
            </PieChart>
        </div>
    );
};

export default AdminDashboardHome;