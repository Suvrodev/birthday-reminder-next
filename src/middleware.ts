import { verifyToken } from "@/components/utils/Function/verifyToken";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  console.log("Path Name: ", pathname);
  console.log("Middleware");
  const token = request.cookies.get("z_br")?.value;
  // const token = await getCurrentUserToken();
  const user = verifyToken(token as string);
  console.log("Middleware Token: ", token);
  console.log("User: ", user);

  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Role admin hole admin-dashboard er route e jete parbe
  if (user.role === "admin") {
    if (
      pathname === "/admin-dashboard" ||
      pathname.startsWith("/admin-dashboard/")
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Role user hole user-dashboard er route e jete parbe
  if (user.role === "user") {
    if (
      pathname === "/user-dashboard" ||
      pathname.startsWith("/user-dashboard/")
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  // matcher: ["/about", "/registration"],
  // matcher: ["/admin-dashboard/:path*"],
  // matcher: ["/admin-dashboard", "/admin-dashboard/:path*"],
  matcher: ["/feedback", "/admin-dashboard/:path*", "/user-dashboard/:path*"],
};
