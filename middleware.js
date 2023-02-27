import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  const isLocal = true;

  const token = request.cookies.get("VcgAuth");
  const tokenlocal = request.cookies.get("tokenVcg");

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
