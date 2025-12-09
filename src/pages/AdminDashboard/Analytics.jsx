import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ThreeDot } from "react-loading-indicators";
import { FaUsers, FaGraduationCap, FaDollarSign } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const formatValue = (value, isCurrency = false) => {
  if (isCurrency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  }

  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  return value;
};


const MetricCard = ({
  title,
  value,
  icon: Icon,
  isCurrency = false,
  bgColor,
}) => (
  <div
    className={`p-6 rounded-xl shadow-lg text-white transform hover:scale-[1.02] transition-all duration-300 ${bgColor}`}
  >
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-sm font-semibold opacity-80">{title}</h3>
      <Icon className="text-3xl opacity-90" />
    </div>
    <p className="text-4xl font-extrabold">{formatValue(value, isCurrency)}</p>
  </div>
);

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {

      const res = await axiosSecure.get("/analytics/platform-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-12 text-center flex justify-center items-center h-[50vh]">
        <ThreeDot
          color="#0c5f5a"
          size="medium"
          text="Loading Analytics..."
          textColor="#0c5f5a"
        />
      </div>
    );
  }

  const {
    totalUsers = 0,
    totalFeesCollected = 0,
    totalScholarships = 0,
    applicationsByCategory = [], 
  } = stats;


  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-10 text-center text-[#0c5f5a]">
        Platform Analytics
      </h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <MetricCard
          title="Total Users"
          value={totalUsers}
          icon={FaUsers}
          bgColor="bg-teal-400"
        />
        <MetricCard
          title="Fees Collected"
          value={totalFeesCollected}
          icon={FaDollarSign}
          isCurrency={true}
          bgColor="bg-green-400"
        />
        <MetricCard
          title="Total Scholarships"
          value={totalScholarships}
          icon={FaGraduationCap}
          bgColor="bg-orange-400"
        />
      </div>

      <hr className="my-10 border-gray-300" />

      {/* Chart  */}
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl border border-gray-100">
        <h3 className="text-2xl font-bold mb-8 text-gray-700">
          Application Count per Scholarship Category
        </h3>

        {applicationsByCategory.length > 0 ? (
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={applicationsByCategory}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="category"
                  stroke="#333"
                  tick={{ fontSize: 12 }}
                  label={{ value: "Scholarship Category", position: "bottom" }}
                />
                <YAxis
                  allowDecimals={false}
                  stroke="#333"
                  label={{
                    value: "Total Applications",
                    angle: -90,
                    position: "left",
                  }}
                />
                <Tooltip
                  formatter={(value) => [
                    `Applications: ${value}`,
                    "Category Count",
                  ]}
                  labelFormatter={(label) => `Category: ${label}`}
                />
                <Legend wrapperStyle={{ paddingTop: 20 }} />
                <Bar
                  dataKey="count"
                  fill="#0c5f5a"
                  name="Applications"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 font-semibold">
            No application data available for charting.
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
