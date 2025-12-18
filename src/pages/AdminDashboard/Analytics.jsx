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
          value={totalFeesCollected || 0}
          icon={FaDollarSign}
          isCurrency={true}
          bgColor="bg-green-400"
        />
        <MetricCard
          title="Total Scholarships"
          value={totalScholarships || 0}
          icon={FaGraduationCap}
          bgColor="bg-orange-400"
        />
      </div>

      <hr className="my-10 border-gray-300" />

      {/* Chart Section */}
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl border border-gray-100 mt-10">
        <h3 className="text-2xl font-bold mb-8 text-gray-700">
          Application Count per Scholarship Category
        </h3>

        {applicationsByCategory && applicationsByCategory.length > 0 ? (
          <div className="w-full h-[400px]">
            {" "}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                key={applicationsByCategory.length}
                data={applicationsByCategory}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eee"
                />
                <XAxis
                  dataKey="category"
                  tick={{ fill: "#666", fontSize: 12 }}
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fill: "#666" }} />
                <Tooltip
                  cursor={{ fill: "#f5f5f5" }}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar
                  dataKey="count"
                  fill="#0c5f5a"
                  radius={[6, 6, 0, 0]}
                  barSize={50}
                  name="Total Applications"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg border-2 border-dashed">
            <p className="text-gray-400">
              No application data found to display chart.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
