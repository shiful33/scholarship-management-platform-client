import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: roleData = {}, isLoading: isRoleLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return { role: 'guest', status: 'N/A' };
            }
            
            const res = await axiosSecure.get(`/user/role/${user.email}`); 
            return res.data;
        },
        enabled: !loading && !!user?.email,
    });
    
    return {
        role: roleData.role || 'guest',
        isRoleLoading
    };
};

export default useRole;