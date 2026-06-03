import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import {
  ACADEMY_HOST,
  CABINET_HOST,
  ACADEMY_ORIGIN,
  CABINET_ORIGIN,
  isCabinetPath,
  isLocaleRoot,
} from "./lib/domains";

const handleI18n = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // Let next-intl resolve the locale first (may issue a locale redirect).
  const res = handleI18n(req);
  if (res.headers.get("location")) return res; // locale redirect — re-enters later

  const host = (req.headers.get("host") ?? "").toLowerCase().split(":")[0];
  const { pathname, search } = req.nextUrl;

  // Only enforce the split on the two real production hosts. Localhost, Vercel
  // preview URLs, etc. serve everything so dev/preview keeps working.
  const isCabinetHost = host === CABINET_HOST;
  const isAcademyHost = host === ACADEMY_HOST;

  if (isCabinetHost) {
    // client.bidbidders.com → only cabinet/auth. Root goes to the dashboard,
    // any marketing path bounces to the academy domain.
    if (isLocaleRoot(pathname)) {
      const url = req.nextUrl.clone();
      url.pathname = `${pathname.replace(/\/$/, "")}/dashboard`;
      return NextResponse.redirect(url);
    }
    if (!isCabinetPath(pathname)) {
      return NextResponse.redirect(`${ACADEMY_ORIGIN}${pathname}${search}`);
    }
  } else if (isAcademyHost) {
    // academy.bidbidders.com → marketing only. Cabinet/auth paths move to client.
    if (isCabinetPath(pathname)) {
      return NextResponse.redirect(`${CABINET_ORIGIN}${pathname}${search}`);
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
