import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader.jsx";

export default function ReportHeader({ icon, title, description, actions }) {
  return (
    <div>
      <Link to="/reports" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-teal-300">
        <FiArrowLeft /> All Reports
      </Link>
      <PageHeader icon={icon} title={title} description={description} actions={actions} />
    </div>
  );
}
