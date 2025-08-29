"use client";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
const clientId =
  "1024658014282-cotu2sij52c1hkh8bukfnpmdlpk8n6cp.apps.googleusercontent.com";
import GoogleIcon from "@mui/icons-material/Google";
import { useLoginMutation } from "@/components/redux/api/authApi";
import { verifyToken } from "@/components/utils/Function/verifyToken";
import { setTokenAction } from "@/components/utils/authService/SetUser";
import { useDispatch } from "react-redux";
import { setUser } from "@/components/redux/features/auth/authSlice";
import { toast } from "sonner";
import { sonarId } from "@/components/utils/Function/sonarId";
import { useRouter } from "next/navigation";
import { TLoggedUser } from "@/components/utils/globalTypes/globalTypes";
interface IUserInfo {
  firstName: string;
  lastName: string;
  image: string;
  email: string;
}

const CustomGoogleLogin = () => {
  const [loginUser] = useLoginMutation();
  const dispatch = useDispatch();

  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log("Access Token:", tokenResponse.access_token);

      // Fetch user info from Google API using access token
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
      const userInfoAll = await res.json();

      const userInfo: IUserInfo = {
        firstName: userInfoAll.given_name,
        lastName: userInfoAll.family_name,
        email: userInfoAll.email,
        image: userInfoAll.picture,
      };

      console.log("User info:", userInfo);

      const loginRes = await loginUser(userInfo).unwrap();
      console.log("Login Res: ", loginRes);

      if (loginRes?.success) {
        const token = loginRes?.data?.token;
        console.log("Token: ", token);
        const userInfoByDecode: TLoggedUser = await verifyToken(token);
        console.log("User Info by Decode: ", userInfoByDecode);
        await setTokenAction(token);
        /***
         * Wow start
         */

        await fetch("/api/set-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token }),
          credentials: "include", // important for cookies
        });
        /***
         * Wow end
         */
        dispatch(setUser({ user: userInfoByDecode, token }));
        toast.success("Login Successfully", { id: sonarId });
        router.push(`${userInfoByDecode.role}-dashboard`);
      }
    },
    onError: () => {
      console.log("Google Login Failed");
    },
    flow: "implicit", // ensures you get access token directly
  });

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <button
        onClick={() => login()}
        className="
          flex items-center justify-center gap-3
          w-full max-w-xs px-6 py-3 rounded-lg
          bg-gradient-to-r from-[#2764a4] to-[#3a7edb]
          text-white font-semibold shadow-lg
          hover:from-[#3a7edb] hover:to-[#2764a4]
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
        "
      >
        {/* Google Icon */}
        <GoogleIcon />
        <span>Google</span>
      </button>
    </GoogleOAuthProvider>
  );
};

export default CustomGoogleLogin;
