import { Outlet } from "react-router-dom";

// Prototype guard: renders the admin panel shell.
// Real admin JWT + role verification is implemented in a later stage.
export default function AdminRoute() {
  return <Outlet />;
}