import { Component } from "react";
import { FiAlertOctagon } from "react-icons/fi";
import Button from "@/components/ui/Button.jsx";

// UI-only fallback boundary. Error reporting/logging to be wired up later.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-red-400/10 text-3xl text-red-400">
            <FiAlertOctagon />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Something went wrong</h2>
          <p className="max-w-sm text-sm text-slate-400">
            An unexpected error occurred while rendering this page. Try refreshing.
          </p>
          <Button onClick={() => this.setState({ hasError: false })}>Try again</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
