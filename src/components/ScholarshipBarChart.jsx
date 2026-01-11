import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Engineering', count: 45 },
  { name: 'Medical', count: 32 },
  { name: 'Business', count: 28 },
  { name: 'Arts', count: 15 },
  { name: 'Science', count: 38 },
];

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ScholarshipBarChart = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full h-[400px]">
      <h2 className="mb-4 text-xl font-bold text-center text-gray-800 dark:text-white">Scholarship Categories</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" vertical={false} />
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="count" radius={[5, 5, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScholarshipBarChart;