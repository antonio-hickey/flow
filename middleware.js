export { default } from "next-auth/middleware"

export const config = { matcher: ["/home"], secret: process.env.NEXTAUTH_URL }
