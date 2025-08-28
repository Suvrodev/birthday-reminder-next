import { getCurrentUserToken } from "@/components/utils/authService/getCurrentUser";
import { verifyToken } from "@/components/utils/Function/verifyToken";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import { setUser } from "@/components/redux/features/auth/authSlice";

interface IProps {
  children: React.ReactNode;
}
const clientId =
  "443326739190-2v64utbr0f4gopjpjech0nrdjt931q91.apps.googleusercontent.com";

const InnerProviders = ({ children }: IProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getCurrentUserToken();
      if (token) {
        const currentUser = verifyToken(token);
        dispatch(setUser({ user: currentUser, token }));
      }
    };
    fetchToken();
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
      <Toaster />
    </GoogleOAuthProvider>
  );
};

export default InnerProviders;
