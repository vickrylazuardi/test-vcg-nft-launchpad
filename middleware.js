import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import cookeieParser from "cookieparser";

export function middleware(request) {
  const response = NextResponse.next();

  const token = request.headers.get("cookie")
    ? cookeieParser.parse(request.headers.get("cookie")).VcgAuth
    : null;

  // console.log("MID", token);

  if (token) {
    response.cookies.set("tokenVcg", token);
    return NextResponse.next();
  }

  if (!token) {
    response.cookies.set("isLogedin", false);
    response.cookies.set("profile-data", null);

    return NextResponse.next();
  }
}
