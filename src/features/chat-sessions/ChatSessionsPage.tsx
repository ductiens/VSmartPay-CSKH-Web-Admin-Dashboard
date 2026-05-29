const navItems = [
  { icon: "dashboard", label: "Tổng quan" },
  { icon: "confirmation_number", label: "Yêu cầu hỗ trợ" },
  { icon: "forum", label: "Phiên chat", active: true },
  { icon: "library_books", label: "Kho tri thức" },
  { icon: "analytics", label: "Báo cáo & Cài đặt" },
];

const metrics = [
  { label: "Active Sessions", value: "124", icon: "forum", iconClass: "text-[#006c4d]" },
  { label: "Avg Bot Confidence", value: "88%", icon: "smart_toy", suffix: "+2.4%", iconClass: "text-[#1fe1a6]" },
  { label: "Escalated Rate", value: "15%", icon: "call_split", iconClass: "text-[#ba1a1a]", danger: true },
  { label: "CSAT", value: "4.8", suffix: "/5", icon: "star", iconClass: "text-[#50fec1]" },
];

const conversations = [
  {
    name: "Nguyễn Văn A",
    time: "10:42 AM",
    message: "Tôi không thể thực hiện giao dịch chuyển tiền...",
    status: "Escalated to CSKH",
    icon: "support_agent",
    active: true,
    danger: true,
  },
  {
    name: "Trần Thị B",
    time: "10:35 AM",
    message: "Phí dịch vụ hàng tháng là bao nhiêu?",
    status: "Answered by AI",
    icon: "smart_toy",
  },
  {
    name: "Lê Hoàng C",
    time: "10:15 AM",
    message: "Cảm ơn, tôi đã hiểu.",
    status: "Answered by AI",
    icon: "smart_toy",
  },
];

function MaterialIcon({ name, className = "", filled = false }: { name: string; className?: string; filled?: boolean }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}

function Sidebar() {
  return (
    <nav className="fixed left-0 top-0 z-50 flex h-full w-[260px] flex-col bg-[#0b1f1a] py-6 shadow-md">
      <div className="mb-8 flex items-center gap-2 px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-[#50fec1]">
          <MaterialIcon name="account_balance_wallet" className="text-[20px] font-bold text-[#0b1f1a]" />
        </div>
        <div>
          <h1 className="text-[20px] font-bold leading-7 text-[#50fec1]">VSmartPay</h1>
          <p className="text-[12px] font-semibold leading-4 tracking-wider text-[#738881]">Admin Dashboard</p>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-1 px-2">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href="#"
              className={
                item.active
                  ? "flex scale-[0.99] items-center gap-4 border-l-4 border-[#50fec1] bg-[#374b44]/20 px-4 py-2 text-[12px] font-bold leading-4 tracking-wider text-[#50fec1] opacity-90 transition-colors"
                  : "flex items-center gap-4 rounded-lg px-4 py-2 text-[12px] font-semibold leading-4 tracking-wider text-[#374b44] transition-colors hover:bg-[#374b44]/10 hover:text-[#50fec1]"
              }
            >
              <MaterialIcon name={item.icon} filled={item.active} />
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-auto px-2">
        <a
          href="#"
          className="flex items-center gap-4 rounded-lg px-4 py-2 text-[12px] font-semibold leading-4 tracking-wider text-[#374b44] transition-colors hover:bg-[#374b44]/10 hover:text-[#50fec1]"
        >
          <MaterialIcon name="settings" />
          Cài đặt
        </a>
      </div>
    </nav>
  );
}

function Topbar() {
  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-[calc(100%-260px)] items-center justify-between border-b border-[#c2c8c4] bg-[#fcf9f8] px-6">
      <div className="relative max-w-md flex-1">
        <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#424845]" />
        <input
          className="w-full rounded-full border border-[#c2c8c4] bg-[#f6f3f2] py-2 pl-10 pr-4 text-[14px] leading-5 text-[#1c1b1b] transition-shadow focus:border-[#50fec1] focus:outline-none focus:ring-1 focus:ring-[#50fec1]"
          placeholder="Tìm kiếm phiên chat..."
          type="text"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#424845] transition-all hover:bg-[#f6f3f2]">
          <MaterialIcon name="notifications" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#424845] transition-all hover:bg-[#f6f3f2]">
          <MaterialIcon name="help_outline" />
        </button>
        <div className="ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#c2c8c4] bg-[#0b1f1a]">
          <span className="text-[12px] font-semibold leading-4 tracking-wider text-[#50fec1]">AD</span>
        </div>
      </div>
    </header>
  );
}

function MetricsGrid() {
  return (
    <div className="grid shrink-0 grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#c2c8c4] bg-white p-4 shadow-sm"
        >
          {metric.danger ? <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-full bg-[#ba1a1a]/5" /> : null}
          <div className="relative z-10 flex items-start justify-between">
            <span className="text-[12px] font-semibold leading-4 tracking-wider text-[#424845]">{metric.label}</span>
            <MaterialIcon name={metric.icon} filled={metric.icon === "star"} className={metric.iconClass} />
          </div>
          <div className="relative z-10 mt-2 flex items-end gap-2">
            <span className="text-[28px] font-bold leading-9 tracking-tight text-[#1c1b1b]">{metric.value}</span>
            {metric.suffix ? (
              <span className={metric.suffix.startsWith("+") ? "mb-1 text-[12px] font-semibold leading-4 tracking-wider text-[#006c4d]" : "text-[18px] font-semibold leading-6 text-[#424845]"}>
                {metric.suffix}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatList() {
  return (
    <div className="flex w-[380px] shrink-0 flex-col overflow-hidden rounded-lg border border-[#c2c8c4] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#c2c8c4] bg-white p-4">
        <h3 className="text-[18px] font-semibold leading-6 text-[#1c1b1b]">Gần đây</h3>
        <button className="text-[#424845] hover:text-[#1c1b1b]">
          <MaterialIcon name="filter_list" className="text-[20px]" />
        </button>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.name}
            className={
              conversation.active
                ? "relative flex cursor-pointer flex-col border-b border-[#e5e2e1] border-l-4 border-l-[#50fec1] bg-[#f6f3f2] p-4 transition-colors"
                : "flex cursor-pointer flex-col border-b border-[#e5e2e1] p-4 transition-colors hover:bg-[#f6f3f2]"
            }
          >
            <div className="mb-1 flex items-start justify-between">
              <span className={`text-[12px] leading-4 tracking-wider text-[#1c1b1b] ${conversation.active ? "font-bold" : "font-semibold"}`}>
                {conversation.name}
              </span>
              <span className="text-[10px] font-semibold leading-4 text-[#424845]">{conversation.time}</span>
            </div>
            <p className="mb-2 truncate text-[13px] leading-5 text-[#424845]">{conversation.message}</p>
            <div className="flex items-center gap-1">
              <span
                className={
                  conversation.danger
                    ? "inline-flex items-center gap-1 rounded-full bg-[#ba1a1a]/10 px-2 py-0.5 text-[10px] font-semibold leading-4 text-[#ba1a1a]"
                    : "inline-flex items-center gap-1 rounded-full bg-[#50fec1]/20 px-2 py-0.5 text-[10px] font-semibold leading-4 text-[#0b1f1a]"
                }
              >
                <MaterialIcon name={conversation.icon} className="text-[12px]" />
                {conversation.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden rounded-lg border border-[#c2c8c4] bg-white shadow-sm">
      <div className="z-10 flex items-center justify-between border-b border-[#c2c8c4] bg-[#fcf9f8] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b5cbc3] font-bold text-[#0b1f1a]">NA</div>
          <div>
            <h3 className="text-[18px] font-semibold leading-6 text-[#1c1b1b]">Nguyễn Văn A</h3>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ba1a1a]" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#424845]">Đang chờ CSKH xử lý</span>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 rounded border border-[#c2c8c4] px-2 py-1.5 text-[12px] font-semibold leading-4 tracking-wider text-[#424845] transition-colors hover:bg-[#f0edec]">
          <MaterialIcon name="history" className="text-[16px]" />
          Lịch sử
        </button>
      </div>

      <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto bg-[#f0edec] p-6">
        <div className="flex justify-center">
          <span className="rounded-full bg-[#e5e2e1] px-3 py-1 text-[10px] font-semibold leading-4 text-[#424845]">Hôm nay, 10:30 AM</span>
        </div>

        <div className="flex justify-end">
          <div className="flex max-w-[70%] flex-col items-end gap-1">
            <div className="rounded-xl rounded-tr-sm bg-black p-4 text-white shadow-sm">
              <p className="text-[14px] leading-5">Chào bạn, tôi đang cố gắng chuyển tiền cho người thân nhưng hệ thống báo lỗi &quot;Hạn mức bị từ chối&quot;. Tôi chưa từng thay đổi hạn mức gì cả.</p>
            </div>
            <span className="text-[10px] font-semibold leading-4 text-[#424845]">10:30 AM</span>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="flex max-w-[70%] gap-2">
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#50fec1]">
              <MaterialIcon name="smart_toy" className="text-[18px] text-[#0b1f1a]" />
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="relative rounded-xl rounded-tl-sm border border-[#c2c8c4] bg-white p-4 text-[#1c1b1b] shadow-sm">
                <p className="mb-2 text-[14px] leading-5">Chào bạn Nguyễn Văn A. VSmartPay rất tiếc về sự cố bạn đang gặp phải.</p>
                <p className="text-[14px] leading-5">Theo kiểm tra ban đầu, có thể giao dịch của bạn vượt quá hạn mức chuyển tiền nhanh trong ngày (mặc định 50.000.000 VND). Bạn có muốn tôi hướng dẫn cách nâng hạn mức qua ứng dụng không?</p>
                <div className="mt-3 flex items-center gap-1 border-t border-[#e5e2e1] pt-2">
                  <MaterialIcon name="bolt" className="text-[14px] text-[#50fec1]" />
                  <span className="text-[10px] font-semibold leading-4 text-[#006c4d]">AI Confidence: 92%</span>
                </div>
              </div>
              <span className="ml-1 text-[10px] font-semibold leading-4 text-[#424845]">10:31 AM</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="flex max-w-[70%] flex-col items-end gap-1">
            <div className="rounded-xl rounded-tr-sm bg-black p-4 text-white shadow-sm">
              <p className="text-[14px] leading-5">Không, tôi chỉ chuyển 2 triệu thôi. Vẫn báo lỗi đó.</p>
            </div>
            <span className="text-[10px] font-semibold leading-4 text-[#424845]">10:33 AM</span>
          </div>
        </div>

        <div className="my-2 flex justify-center">
          <div className="flex items-center gap-2 rounded-lg border border-[#ba1a1a]/20 bg-[#ffdad6]/50 px-4 py-2 text-[#93000a]">
            <MaterialIcon name="warning" className="text-[16px]" />
            <span className="text-[12px] font-semibold leading-4">Hệ thống không thể tự động xử lý. Phiên chat đã được chuyển tiếp đến Bộ phận CSKH.</span>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="flex max-w-[70%] gap-2">
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b1f1a]">
              <span className="text-[10px] font-semibold leading-4 tracking-wider text-[#50fec1]">AD</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="rounded-xl rounded-tl-sm border border-[#50fec1]/30 bg-[#0b1f1a] p-4 text-[#374b44] shadow-sm">
                <div className="mb-1 flex items-center gap-1">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#50fec1]" />
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#50fec1] delay-75" />
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#50fec1] delay-150" />
                </div>
                <p className="mt-1 text-[10px] font-semibold leading-4 text-[#50fec1]">Agent is reviewing context...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#c2c8c4] bg-white p-4">
        <div className="flex items-center rounded-lg border border-[#c2c8c4] bg-[#f0edec] px-4 py-2 opacity-70">
          <MaterialIcon name="attach_file" className="mr-3 cursor-not-allowed text-[#424845]" />
          <input
            className="flex-1 cursor-not-allowed border-none bg-transparent p-0 text-[14px] leading-5 text-[#424845] outline-none focus:ring-0"
            disabled
            placeholder="Chế độ giám sát - Nhấn 'Mở Ticket' để can thiệp..."
            type="text"
          />
          <button className="ml-3 cursor-not-allowed text-[#c2c8c4]" disabled>
            <MaterialIcon name="send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatSessionsPage() {
  return (
    <div className="h-screen overflow-hidden bg-[#fcf9f8] font-['Inter',sans-serif] text-[#1c1b1b] antialiased">
      <Sidebar />
      <Topbar />
      <main className="ml-[260px] mt-16 flex h-[calc(100vh-64px)] flex-col gap-6 overflow-hidden p-6">
        <div className="flex shrink-0 items-end justify-between">
          <div>
            <h2 className="text-[28px] font-bold leading-9 tracking-tight text-[#1c1b1b]">Phiên Chat</h2>
            <p className="mt-1 text-[14px] leading-5 text-[#424845]">Giám sát và quản lý các cuộc trò chuyện trực tiếp.</p>
          </div>
          <button className="flex items-center gap-2 rounded bg-black px-4 py-2 text-[12px] font-semibold leading-4 tracking-wider text-white shadow-sm transition-colors hover:bg-[#424845]">
            <MaterialIcon name="add_circle" className="text-[18px]" />
            Mở Ticket
          </button>
        </div>

        <MetricsGrid />

        <div className="flex min-h-0 flex-1 gap-6">
          <ChatList />
          <ChatPreview />
        </div>
      </main>
    </div>
  );
}
