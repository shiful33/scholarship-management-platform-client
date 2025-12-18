import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    queryKey: [user?.email, "role"],

    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (!user?.email) return null;

      console.log("Fetching role for:", user.email);
      const res = await axiosSecure.get(`/user/role/${user.email}`);

      return res.data?.role;
    },
  });

  return {
    role: role || "guest", 
    isRoleLoading,
  };
};

export default useRole;
