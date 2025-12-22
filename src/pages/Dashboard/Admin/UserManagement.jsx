import React from 'react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UserManagement = () => {

    const { data: users = [], isLoading } = useQuery({
  queryKey: ["all-users"],
  queryFn: async () => {
    const res = await useAxiosSecure.get("/users");
    return res.data;
  },

});

const updateRoleMutation = useMutation({
  mutationFn: async ({ userId, newRole }) => {
    
    await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
  },
  onSuccess: () => {
    QueryClient.invalidateQueries(["all-users"]); 
    toast.success("User role updated successfully!");
  },
});

const handleMakeAdmin = (user) => {
    updateRoleMutation.mutate({ userId: user._id, newRole: 'admin' });
};

    return (
        <div>
            
        </div>
    );
};

export default UserManagement;