const DashboardHome = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="mb-8 text-3xl font-bold dark:text-white">Admin Overview</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
         <div className="p-6 bg-white shadow dark:bg-gray-800 rounded-xl">
            <p className="text-gray-500">Total Applications</p>
            <h3 className="text-2xl font-bold dark:text-white">850</h3>
         </div>
         {/* Others card here */}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ScholarshipBarChart />
        <ApplicationPieChart />
      </div>
    </div>
  );
};

export default DashboardHome;