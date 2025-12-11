import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: roleData, isLoading: isRoleLoading, isError } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return { role: 'student' };
            }
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email && !loading,
        staleTime: Infinity,
    });

    const role = roleData?.role || 'student';
    const isStudent = role === 'student';
    const isModerator = role === 'moderator';
    const isAdmin = role === 'admin';

    return { role, isRoleLoading, isStudent, isModerator, isAdmin };
};

export default useRole;