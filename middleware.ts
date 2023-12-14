export { default } from "next-auth/middleware"

//protect these routes only
export const config = { 
  matcher: [
    "/trips",
    "/reservations",
    "/properties",
    "/favorites"
  ]
};
