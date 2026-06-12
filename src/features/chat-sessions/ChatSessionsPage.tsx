import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { MainLayout } from "../../components/layout";
import type { RootState } from "../../redux/auth/store";
import {
  getWaitingSessions,
  getSessionMessages,
  sendAdminMessage,
  type ChatSession,
  type ChatMessage,
} from "./chat.api";

function MaterialIcon({
  name,
  className = "",
  filled = false,
  spinning = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
  spinning?: boolean;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className} ${spinning ? "animate-spin inline-block" : ""}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}

function MetricsGrid({ sessions }: { sessions: ChatSession[] }) {
  const metrics = [
    {
      label: "Phiên Đang Chờ",
      value: String(sessions.length),
      icon: "forum",
      iconClass: "text-[#ba1a1a]",
      danger: sessions.length > 0,
    },
    {
      label: "Avg Bot Confidence",
      value: "92%",
      icon: "smart_toy",
      suffix: "+2.4%",
      iconClass: "text-[#00D99F]",
    },
    {
      label: "Escalated Rate",
      value: "12%",
      icon: "call_split",
      iconClass: "text-[#ba1a1a]/70",
    },
    {
      label: "CSAT",
      value: "4.8",
      suffix: "/5",
      icon: "star",
      iconClass: "text-[#00D99F]",
    },
  ];

  return (
    <div className="grid shrink-0 grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#c2c8c4] bg-white p-4 shadow-sm"
        >
          {metric.danger ? (
            <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-full bg-[#ba1a1a]/5" />
          ) : null}
          <div className="relative z-10 flex items-start justify-between">
            <span className="text-[12px] font-semibold leading-4 tracking-wider text-[#424845]">
              {metric.label}
            </span>
            <MaterialIcon
              name={metric.icon}
              filled={metric.icon === "star"}
              className={metric.iconClass}
            />
          </div>
          <div className="relative z-10 mt-2 flex items-end gap-2">
            <span className="text-[28px] font-bold leading-9 tracking-tight text-[#1c1b1b]">
              {metric.value}
            </span>
            {metric.suffix ? (
              <span
                className={
                  metric.suffix.startsWith("+")
                    ? "mb-1 text-[12px] font-semibold leading-4 tracking-wider text-[#006c4d]"
                    : "text-[18px] font-semibold leading-6 text-[#424845]"
                }
              >
                {metric.suffix}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

interface ChatListProps {
  sessions: ChatSession[];
  selectedSessionId: string | null;
  onSelectSession: (id: string) => void;
  isLoading: boolean;
}

function ChatList({
  sessions,
  selectedSessionId,
  onSelectSession,
  isLoading,
}: ChatListProps) {
  // Format time helper
  const formatTime = (timeStr: string) => {
    try {
      const date = new Date(timeStr);
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "-";
    }
  };

  return (
    <div className="flex w-[380px] shrink-0 flex-col overflow-hidden rounded-lg border border-[#c2c8c4] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#c2c8c4] bg-white p-4">
        <h3 className="text-[18px] font-semibold leading-6 text-[#1c1b1b]">Gần đây</h3>
        <span className="bg-[#ba1a1a]/10 text-[#ba1a1a] text-[12px] px-2 py-0.5 rounded-full font-bold">
          {sessions.length} chờ hỗ trợ
        </span>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-8 text-center text-[#424845]">
            <MaterialIcon name="sync" className="text-[28px]" spinning />
            <p className="text-[13px] mt-2 font-medium">Đang tải danh sách...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-8 text-center text-[#424845] flex flex-col items-center justify-center h-full">
            <MaterialIcon name="done_all" className="text-[40px] text-gray-300" />
            <p className="text-[13px] mt-2 font-medium text-gray-400">
              Không có phiên chat nào đang chờ CSKH
            </p>
          </div>
        ) : (
          sessions.map((session) => {
            const isActive = session.session_id === selectedSessionId;
            const title =
              session.title || `Khách hàng (${session.user_id.substring(0, 6)})`;

            return (
              <div
                key={session.session_id}
                onClick={() => onSelectSession(session.session_id)}
                className={`flex cursor-pointer flex-col border-b border-[#e5e2e1] p-4 transition-colors ${
                  isActive
                    ? "border-l-4 border-l-[#00D99F] bg-[#f6f3f2]"
                    : "hover:bg-[#f6f3f2]"
                }`}
              >
                <div className="mb-1 flex items-start justify-between">
                  <span
                    className={`text-[12px] leading-4 tracking-wider text-[#1c1b1b] truncate max-w-[200px] ${
                      isActive ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {title}
                  </span>
                  <span className="text-[10px] font-semibold leading-4 text-[#424845]">
                    {formatTime(session.updated_at)}
                  </span>
                </div>
                <p className="mb-2 truncate text-[13px] leading-5 text-[#424845]">
                  [Yêu cầu kết nối CSKH từ khách hàng]
                </p>
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#ba1a1a]/10 px-2 py-0.5 text-[10px] font-semibold leading-4 text-[#ba1a1a]">
                    <MaterialIcon name="support_agent" className="text-[12px]" />
                    Escalated to CSKH
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

interface ChatPreviewProps {
  sessionId: string | null;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => Promise<void>;
  isSending: boolean;
  sessionTitle: string;
}

function ChatPreview({
  sessionId,
  messages,
  isLoading,
  onSendMessage,
  isSending,
  sessionTitle,
}: ChatPreviewProps) {
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSending) return;
    try {
      await onSendMessage(text);
      setText("");
    } catch (err: any) {
      alert(err.message || "Gửi tin nhắn thất bại");
    }
  };

  const getInitials = (title: string) => {
    return title ? title.substring(0, 2).toUpperCase() : "US";
  };

  const formatMessageTime = (timeStr: string) => {
    try {
      const date = new Date(timeStr);
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "";
    }
  };

  if (!sessionId) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center overflow-hidden rounded-lg border border-[#c2c8c4] bg-white shadow-sm p-8 text-center text-[#424845]">
        <MaterialIcon name="forum" className="text-[64px] text-gray-200" />
        <h3 className="text-[18px] font-bold text-black mt-4">Hỗ Trợ CSKH Trực Tiếp</h3>
        <p className="max-w-xs text-[13px] text-gray-400 mt-2">
          Chọn một cuộc hội thoại đang chờ từ danh sách bên trái để tham gia hỗ trợ trực tuyến.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden rounded-lg border border-[#c2c8c4] bg-white shadow-sm">
      {/* Header */}
      <div className="z-10 flex items-center justify-between border-b border-[#c2c8c4] bg-[#fcf9f8] p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b5cbc3] font-bold text-[#0b1f1a]">
            {getInitials(sessionTitle)}
          </div>
          <div>
            <h3 className="text-[18px] font-semibold leading-6 text-[#1c1b1b]">
              {sessionTitle}
            </h3>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ba1a1a] animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#424845]">
                Đang chờ CSKH can thiệp...
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto bg-[#f0edec] p-6">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center text-[#424845]">
            <MaterialIcon name="sync" className="text-[32px]" spinning />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-gray-400 text-[13px]">
            Hội thoại chưa có tin nhắn.
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.role === "user";
            const isHumanAgent =
              msg.role === "assistant" && msg.sender === "HUMAN_AGENT";

            if (isUser) {
              return (
                <div key={index} className="flex justify-end">
                  <div className="flex max-w-[70%] flex-col items-end gap-1">
                    <div className="rounded-xl rounded-tr-sm bg-black p-4 text-white shadow-sm">
                      <p className="text-[14px] leading-5">{msg.content}</p>
                    </div>
                    <span className="text-[10px] font-semibold leading-4 text-[#424845]">
                      {formatMessageTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              );
            }

            if (isHumanAgent) {
              return (
                <div key={index} className="flex justify-end">
                  <div className="flex max-w-[70%] flex-col items-end gap-1">
                    <div className="rounded-xl rounded-tr-sm bg-[#00D99F] p-4 text-[#041712] shadow-sm font-semibold">
                      <p className="text-[14px] leading-5">{msg.content}</p>
                    </div>
                    <span className="text-[10px] font-semibold leading-4 text-[#424845]">
                      CSKH • {formatMessageTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              );
            }

            // AI Bot Response
            return (
              <div key={index} className="flex justify-start">
                <div className="flex max-w-[70%] gap-2">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#50fec1]">
                    <MaterialIcon name="smart_toy" className="text-[18px] text-[#0b1f1a]" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <div className="relative rounded-xl rounded-tl-sm border border-[#c2c8c4] bg-white p-4 text-[#1c1b1b] shadow-sm">
                      <p className="text-[14px] leading-5">{msg.content}</p>

                      {(msg.intent || (msg.sources && msg.sources.length > 0)) && (
                        <div className="mt-3 flex flex-wrap gap-2 border-t border-[#e5e2e1] pt-2 text-[10px] text-[#424845] font-semibold">
                          {msg.intent && (
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded">
                              Ý định: {msg.intent}
                            </span>
                          )}
                          {msg.sources && msg.sources.length > 0 && (
                            <span className="bg-[#50fec1]/20 text-[#006c4d] px-1.5 py-0.5 rounded">
                              AI RAG ({msg.sources.length} nguồn)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="ml-1 text-[10px] font-semibold leading-4 text-[#424845]">
                      AI Trợ lý • {formatMessageTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <form onSubmit={handleSend} className="border-t border-[#c2c8c4] bg-white p-4">
        <div className="flex items-center rounded-lg border border-[#c2c8c4] bg-[#f0edec] px-4 py-2">
          <input
            className="flex-1 border-none bg-transparent p-0 text-[14px] leading-5 text-[#424845] outline-none focus:ring-0 placeholder:text-gray-400"
            placeholder="Chế độ can thiệp - Gõ nội dung và nhấn gửi để trả lời..."
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSending}
          />
          <button
            type="submit"
            className={`ml-3 cursor-pointer transition-colors ${
              text.trim() ? "text-[#00D99F] hover:text-[#1fe1a6]" : "text-[#c2c8c4] pointer-events-none"
            }`}
            disabled={isSending}
          >
            {isSending ? (
              <MaterialIcon name="sync" spinning />
            ) : (
              <MaterialIcon name="send" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ChatSessionsPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState<boolean>(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const token = useSelector((state: RootState) => state.auth.accessToken);

  // Fetch waiting sessions
  const fetchSessions = useCallback(
    async (showLoading = false) => {
      if (!token) return;
      if (showLoading) setIsLoadingSessions(true);
      try {
        const res = await getWaitingSessions(token);
        if (res && res.success) {
          setSessions(res.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải danh sách phiên chờ:", err);
      } finally {
        if (showLoading) setIsLoadingSessions(false);
      }
    },
    [token]
  );

  // Fetch session messages
  const fetchMessages = useCallback(
    async (sessionId: string, showLoading = false) => {
      if (!token) return;
      if (showLoading) setIsLoadingMessages(true);
      try {
        const res = await getSessionMessages(sessionId, token);
        if (res && res.success) {
          setMessages(res.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải tin nhắn phiên chat:", err);
      } finally {
        if (showLoading) setIsLoadingMessages(false);
      }
    },
    [token]
  );

  // Initial load
  useEffect(() => {
    fetchSessions(true);
  }, [fetchSessions]);

  // Polling for sessions (every 5 seconds)
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      fetchSessions(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [token, fetchSessions]);

  // Polling for messages in active session (every 3 seconds)
  useEffect(() => {
    if (!token || !selectedSessionId) return;
    const interval = setInterval(() => {
      fetchMessages(selectedSessionId, false);
    }, 3000);
    return () => clearInterval(interval);
  }, [token, selectedSessionId, fetchMessages]);

  const handleSelectSession = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    fetchMessages(sessionId, true);
  };

  const handleSendMessage = async (text: string) => {
    if (!selectedSessionId || !token) return;
    setIsSending(true);
    try {
      const res = await sendAdminMessage(selectedSessionId, text, token);
      if (res && res.success) {
        await fetchMessages(selectedSessionId, false);
      }
    } catch (err: any) {
      throw new Error(err.message || "Gửi tin nhắn thất bại");
    } finally {
      setIsSending(false);
    }
  };

  const getSelectedSessionTitle = () => {
    const active = sessions.find((s) => s.session_id === selectedSessionId);
    if (active) {
      return active.title || `Khách hàng (${active.user_id.substring(0, 6)})`;
    }
    return "Khách hàng";
  };

  return (
    <MainLayout>
      <div className="flex h-full flex-col gap-6 overflow-hidden bg-[#fcf9f8] text-[#1c1b1b] antialiased">
        <div className="flex shrink-0 items-end justify-between">
          <div>
            <h2 className="text-[28px] font-bold leading-9 tracking-tight text-[#1c1b1b]">
              Phiên Chat
            </h2>
            <p className="mt-1 text-[14px] leading-5 text-[#424845]">
              Giám sát và quản lý các cuộc trò chuyện trực tiếp đang chờ CSKH hỗ trợ.
            </p>
          </div>
        </div>

        <MetricsGrid sessions={sessions} />

        <div className="flex min-h-0 flex-1 gap-6 pb-6">
          <ChatList
            sessions={sessions}
            selectedSessionId={selectedSessionId}
            onSelectSession={handleSelectSession}
            isLoading={isLoadingSessions}
          />
          <ChatPreview
            sessionId={selectedSessionId}
            messages={messages}
            isLoading={isLoadingMessages}
            onSendMessage={handleSendMessage}
            isSending={isSending}
            sessionTitle={getSelectedSessionTitle()}
          />
        </div>
      </div>
    </MainLayout>
  );
}
