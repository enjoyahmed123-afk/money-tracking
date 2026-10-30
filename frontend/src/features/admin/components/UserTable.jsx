import { Link } from "react-router-dom";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/Table.jsx";
import Badge from "@/components/ui/Badge.jsx";

const USERS = [
  { id: 1, name: "Sara Ahmed", email: "sara@example.com", plan: "Pro", status: "Active", joined: "Jan 12, 2026" },
  { id: 2, name: "Omar Khaled", email: "omar@example.com", plan: "Free", status: "Active", joined: "Feb 3, 2026" },
  { id: 3, name: "Layla Mostafa", email: "layla@example.com", plan: "Business", status: "Suspended", joined: "Mar 21, 2026" },
];

export default function UserTable() {
  return (
    <Table>
      <THead>
        <TR>
          <TH>Name</TH>
          <TH>Email</TH>
          <TH>Plan</TH>
          <TH>Status</TH>
          <TH>Joined</TH>
        </TR>
      </THead>
      <TBody>
        {USERS.map((u) => (
          <TR key={u.id}>
            <TD>
              <Link to={`/admin/users/${u.id}`} className="font-semibold text-slate-100 hover:text-teal-300">
                {u.name}
              </Link>
            </TD>
            <TD className="text-slate-400">{u.email}</TD>
            <TD>
              <Badge color={u.plan === "Business" ? "indigo" : u.plan === "Pro" ? "teal" : "slate"}>{u.plan}</Badge>
            </TD>
            <TD>
              <Badge color={u.status === "Active" ? "emerald" : "red"}>{u.status}</Badge>
            </TD>
            <TD className="text-slate-400">{u.joined}</TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
