import PeriodSelector from "@/components/common/PeriodSelector.jsx";

// Thin wrapper kept for the dashboard feature namespace; delegates to the shared selector.
export default function PeriodSwitcher(props) {
  return <PeriodSelector {...props} />;
}
