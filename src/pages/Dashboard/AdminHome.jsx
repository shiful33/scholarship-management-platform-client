import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure'; 
import { FaUsers, FaClipboardList, FaDollarSign, FaChartBar } from 'react-icons/fa';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['platformStats'],
        queryFn: async () => {

            const res = await axiosSecure.get('/analytics/platform-stats'); 
            return res.data;
        },
    });

    const { totalUsers, totalFeesCollected, totalScholarships, applicationsByCategory = [] } = stats;

    if (isLoading) {
        return (
            <div className="text-center p-10">
                <p className="text-xl font-semibold text-red-600">Fetching Platform Stats...</p>
            </div>
        );
    }
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-4xl font-extrabold text-red-700 mb-8 border-b pb-2">
                🏠 Admin Dashboard Overview
            </h2>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                
                {/* Total Users Card */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between border-l-4 border-red-500">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Users</p>
                        <p className="text-3xl font-bold text-gray-900">{totalUsers || 0}</p>
                    </div>
                    <FaUsers className="text-5xl text-red-400 opacity-60" />
                </div>

                {/* Total Scholarships Card */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between border-l-4 border-blue-500">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Scholarships Added</p>
                        <p className="text-3xl font-bold text-gray-900">{totalScholarships || 0}</p>
                    </div>
                    <FaClipboardList className="text-5xl text-blue-400 opacity-60" />
                </div>

                {/* Total Fees Collected Card */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between border-l-4 border-green-500">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Fees Collected</p>
                        <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalFeesCollected || 0)}</p>
                    </div>
                    <FaDollarSign className="text-5xl text-green-400 opacity-60" />
                </div>
            </div>

            {/* Applications by Category Section */}
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaChartBar className="mr-2 text-red-500" />
                    Applications by Category
                </h3>
                <div className="space-y-3">
                    {applicationsByCategory.length > 0 ? (
                        applicationsByCategory.map((item, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                <p className="font-semibold text-gray-700">{item.category}</p>
                                <span className="text-lg font-bold text-red-600">{item.count}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No application data available yet.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default AdminHome;