import { Outlet } from "react-router-dom";

// Prototype guard: wraps subscription-gated feature area.
// Real handling of SUBSCRIPTION_EXPIRED / trial limits comes later.
export default function SubscriptionGuard() {
  return <Outlet />;
}