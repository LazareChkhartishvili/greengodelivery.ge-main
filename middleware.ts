import { createI18nMiddleware } from "next-international/middleware"
import { NextMiddlewareWithAuth, withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server"

export const locales = ["en", "ka"] as const

const intlMiddleware = createI18nMiddleware({
  locales: ["en", "ka"],
  defaultLocale: "ka",
  resolveLocaleFromRequest: () => {
    // Do your logic here to resolve the locale
    return "ka"
  },
})

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/",
    },
  },
)

export default function middleware(req: NextRequest) {
  const excludePattern =
    "^(/(" + locales.join("|") + "))?/(ka|en)/dashboard/?.*?$"
  const publicPathnameRegex = RegExp(excludePattern, "i")
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    //@ts-expect-error need to fix this
    return (authMiddleware as NextMiddlewareWithAuth)(req)
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
