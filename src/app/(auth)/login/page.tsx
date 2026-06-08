import LoginContainer from "@/feature/auth/login/container/LoginContainer";
import { AuthProvider } from "@/shared/context/AuthContext";

const page = () => {
  return (
    <AuthProvider>
      <LoginContainer />
    </AuthProvider>
  );
};

export default page;
