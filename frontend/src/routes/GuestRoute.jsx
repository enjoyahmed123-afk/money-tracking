import { Outlet } from "react-router-dom";

// Prototype guard: wraps public pages (login, register, forgot/reset password).
// Real redirect logic (authenticated users away from auth pages) comes later.
export default function GuestRoute() {
  return <Outlet />;
}