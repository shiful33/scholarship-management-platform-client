import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const applicationData = [
  { name: 'Pending', value: 400 },
  { name: 'Approved', value: 300 },
  { name: 'Rejected', value: 150 },
];

const COLORS = ['#FFBB28', '#00C49F', '#FF8042'];

const ApplicationPieChart = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full h-[400px]">
      <h2 className="mb-4 text-xl font-bold text-center text-gray-800 dark:text-white">Application Status</h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={applicationData}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {applicationData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend iconType="circle" verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationPieChart;