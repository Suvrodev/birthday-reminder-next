import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyToken = (token: string): any => {
  if (token) {
    return jwtDecode(token);
  }
};
