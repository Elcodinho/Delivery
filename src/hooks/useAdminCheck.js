import { useSelector } from "react-redux";

const useAdminCheck = (adminEmail) => {
  const userEmail = useSelector((state) => state.user.email);

  return userEmail === adminEmail ? userEmail : false;
};

export default useAdminCheck;
