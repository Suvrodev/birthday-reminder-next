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
      console.log("Token from Innter Provider: ", token);
      if (token) {
        try {
          const currentUser = verifyToken(token);
          console.log("User form Inner Provider----------: ", currentUser);
          dispatch(setUser({ user: currentUser, token }));
        } catch (err) {
          console.error("verifyToken failed:", err);
        }
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
