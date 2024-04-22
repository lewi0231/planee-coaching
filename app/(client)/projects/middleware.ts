import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.method === "POST" &&
    request.nextUrl.pathname === "/projects/create"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/projects";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
