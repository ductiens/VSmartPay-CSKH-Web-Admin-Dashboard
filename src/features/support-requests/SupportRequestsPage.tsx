import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/layout";

interface SupportTicket {
  id: string;
  ticketId: string;
  customer: string;
  issue: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  created: string;
  agent?: string;
}

export default function SupportRequestsPage() {
  const { t } = useTranslation();
  const [tickets] = useState<SupportTicket[]>([
    {
      id: "1",
      ticketId: "#TK-2023-991",
      customer: "Nguyen Tran Vy",
      issue: "Unauthorized Transfer Report",
      status: "in_progress",
      priority: "urgent",
      created: "2 hours ago",
      agent: "Minh Tuan",
    },
    {
      id: "2",
      ticketId: "#TK-2023-990",
      customer: "Le Minh Duc",
      issue: "Account Locked",
      status: "resolved",
      priority: "high",
      created: "4 hours ago",
      agent: "Dang Xuan",
    },
    {
      id: "3",
      ticketId: "#TK-2023-989",
      customer: "Tran Quang Hieu",
      issue: "Payment Failed",
      status: "open",
      priority: "medium",
      created: "1 day ago",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-secondary-fixed/10 text-secondary-fixed";
      case "in_progress":
        return "bg-secondary-fixed/20 text-secondary-fixed";
      case "resolved":
        return "bg-secondary/10 text-secondary";
      case "closed":
        return "bg-on-surface-variant/10 text-on-surface-variant";
      default:
        return "bg-surface-container";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-error/10 text-error";
      case "high":
        return "bg-error/5 text-error";
      case "medium":
        return "bg-on-surface-variant/10 text-on-surface-variant";
      case "low":
        return "bg-secondary/10 text-secondary";
      default:
        return "bg-surface-container";
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-lg">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-sm">{t("nav.supportRequests")}</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">{t("support.description")}</p>
          </div>
          <button className="px-4 py-2 bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold rounded hover:brightness-105 transition-all shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined">add</span>
            New Ticket
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-md">
          <input
            type="text"
            placeholder="Search tickets..."
            className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg py-2 px-md font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary-fixed focus:ring-1 focus:ring-secondary-fixed transition-all"
          />
          <select className="bg-surface-container-low border border-outline-variant rounded-lg py-2 px-md font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary-fixed">
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select className="bg-surface-container-low border border-outline-variant rounded-lg py-2 px-md font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary-fixed">
            <option value="">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Tickets Table */}
        <div className="bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg border border-surface-container-highest overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-md text-on-surface">
              <thead className="bg-surface-container border-b border-outline-variant">
                <tr>
                  <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant">Ticket</th>
                  <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant">Customer</th>
                  <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant">Issue</th>
                  <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant">Priority</th>
                  <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant">Status</th>
                  <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant">Agent</th>
                  <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant">Created</th>
                  <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-md py-sm font-body-md font-bold text-on-surface">{ticket.ticketId}</td>
                    <td className="px-md py-sm">{ticket.customer}</td>
                    <td className="px-md py-sm">{ticket.issue}</td>
                    <td className="px-md py-sm">
                      <span
                        className={`px-2 py-1 rounded text-label-md font-label-md ${getPriorityColor(ticket.priority)}`}
                      >
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-md py-sm">
                      <span
                        className={`px-2 py-1 rounded text-label-md font-label-md ${getStatusColor(ticket.status)}`}
                      >
                        {ticket.status === "in_progress"
                          ? "In Progress"
                          : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-md py-sm">{ticket.agent || "-"}</td>
                    <td className="px-md py-sm text-on-surface-variant">{ticket.created}</td>
                    <td className="px-md py-sm">
                      <button className="text-secondary-fixed hover:underline font-label-md">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
