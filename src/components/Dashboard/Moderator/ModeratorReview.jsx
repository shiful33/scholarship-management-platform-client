import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ModeratorReview = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { 
        data: pendingApps = [], 
        isLoading, 
        isError 
    } = useQuery({
        queryKey: ["pending-applications"],
        queryFn: async () => {
            const res = await axiosSecure.get("/applications/pending");
            return res.data;
        },
    });

    const statusUpdateMutation = useMutation({
        mutationFn: async ({ id, status, feedback }) => {
            await axiosSecure.patch(`/applications/status/${id}`, { status, feedback });
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["pending-applications"]);
            toast.success(`Application successfully ${variables.status}!`);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update status.");
        },
    });

    const handleApprove = (appId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to approve this application?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Approve",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                statusUpdateMutation.mutate({ id: appId, status: 'Approved' });
            }
        });
    };

    const handleReject = (appId) => {
        Swal.fire({
            title: "Reject Application",
            input: "text",
            inputLabel: "Please provide a feedback/reason for rejection:",
            inputPlaceholder: "Optional reason...",
            showCancelButton: true,
            confirmButtonText: "Reject",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            preConfirm: (feedback) => {
                statusUpdateMutation.mutate({ id: appId, status: 'Rejected', feedback });
            },
        });
    };

    /* if (isLoading) {

    }

    if (isError) {
        
    } */

    return (
    <div className="p-4 md:p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b pb-2">
            ⏳ Moderator Review Panel ({pendingApps.length} Pending)
        </h2>

        {pendingApps.length === 0 ? (
            <div className="text-center p-10 bg-gray-100 rounded-lg">
                <p className="text-xl text-gray-600">🎉 No pending applications to review right now!</p>
            </div>
        ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th>SL</th>
                            <th>Scholarship Title</th>
                            <th>Applicant Name</th>
                            <th>Applicant Email</th>
                            <th>Applied Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingApps.map((app, index) => (
                            <tr key={app._id} className="hover:bg-orange-50/50">
                                <th>{index + 1}</th>
                                <td>{app.scholarshipTitle || 'N/A'}</td>
                                <td>{app.applicantName || 'N/A'}</td>
                                <td>{app.applicantEmail}</td>
                                <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                                <td className="text-center">
                                    <div className="flex gap-2 justify-center">
                                        {/* Approve Button */}
                                        <button
                                            onClick={() => handleApprove(app._id)}
                                            className="btn btn-xs btn-success text-white"
                                            disabled={statusUpdateMutation.isLoading}
                                        >
                                            Approve
                                        </button>
                                        
                                        {/* Reject Button */}
                                        <button
                                            onClick={() => handleReject(app._id)}
                                            className="btn btn-xs btn-error text-white"
                                            disabled={statusUpdateMutation.isLoading}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
);
}; 

export default ModeratorReview;