import axios from "axios";

const AGENT_API_URL = import.meta.env.VITE_AGENT_API_URL || "http://localhost:8000";

const agentClient = axios.create({
  baseURL: `${AGENT_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

agentClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errMsg = error.response?.data?.message || error.message || "Đã xảy ra lỗi kết nối với AI Agent";
    return Promise.reject(new Error(errMsg));
  }
);

export interface DocumentListItem {
  doc_id: string;
  file_name: string;
  status: string; // "processing" | "processed" | "failed" | "duplicate"
  chunk_count: number;
  error_message: string | null;
  cloudinary_url?: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface UploadResult {
  doc_id?: string;
  file_name: string;
  status: string;
  chunk_count: number;
  error_message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getDocuments = (): Promise<ApiResponse<DocumentListItem[]>> => {
  return agentClient.get("/documents/");
};

export const uploadDocuments = (
  files: File[],
  kbType: string = "other",
  category: string = "General",
  language: string = "vi"
): Promise<ApiResponse<UploadResult[]>> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  return agentClient.post("/documents/upload", formData, {
    params: {
      kb_type: kbType,
      category,
      language,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteDocument = (docId: string): Promise<ApiResponse<null>> => {
  return agentClient.delete(`/documents/${docId}`);
};

export interface DocumentChunkItem {
  chunk_id: string;
  chunk_index: number;
  content: string;
  page?: number;
  heading?: string;
  category?: string;
  kb_type?: string;
  token_count?: number;
}

export const getDocumentChunks = (docId: string): Promise<ApiResponse<DocumentChunkItem[]>> => {
  return agentClient.get(`/documents/${docId}/chunks`);
};
