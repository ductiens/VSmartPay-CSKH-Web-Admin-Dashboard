import axios from "axios";

const AGENT_API_URL = import.meta.env.VITE_AGENT_API_URL || "http://localhost:8000";

const agentChatClient = axios.create({
  baseURL: AGENT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

agentChatClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errMsg = error.response?.data?.message || error.message || "Đã xảy ra lỗi kết nối với AI Agent";
    return Promise.reject(new Error(errMsg));
  }
);

export interface ChatSession {
  session_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  status: string;
  title: string | null;
}

export interface ChatMessage {
  role: string;
  content: string;
  timestamp: string;
  intent?: string | null;
  sources?: any[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getWaitingSessions = (token: string): Promise<ApiResponse<ChatSession[]>> => {
  return agentChatClient.get("/api/v1/admin/chat-sessions/waiting", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSessionMessages = (
  sessionId: string,
  token: string
): Promise<ApiResponse<ChatMessage[]>> => {
  return agentChatClient.get(`/api/v1/admin/chat-sessions/${sessionId}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendAdminMessage = (
  sessionId: string,
  message: string,
  token: string
): Promise<ApiResponse<{ session_id: string; status: string }>> => {
  return agentChatClient.post(
    `/api/v1/admin/chat-sessions/${sessionId}/messages`,
    {
      message,
      sender: "HUMAN_AGENT",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
