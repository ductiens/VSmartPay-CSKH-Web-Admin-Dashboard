import { useState, useEffect, useRef, useCallback } from "react";
import { MainLayout } from "../../components/layout";
import {
  getDocuments,
  uploadDocuments,
  deleteDocument,
  type DocumentListItem,
} from "./knowledgeBase.api";

function MaterialIcon({
  name,
  className = "",
  spinning = false,
}: {
  name: string;
  className?: string;
  spinning?: boolean;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className} ${
        spinning ? "animate-spin inline-block" : ""
      }`}
    >
      {name}
    </span>
  );
}

export default function KnowledgeBasePage() {
  // States
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Modal states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [kbType, setKbType] = useState<string>("other");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch documents from API
  const fetchDocs = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const res = await getDocuments();
      if (res && res.success) {
        setDocuments(res.data);
      }
    } catch (err: any) {
      console.error("Lỗi khi tải danh sách tài liệu:", err);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchDocs(true);
  }, [fetchDocs]);

  // Polling logic: quét mỗi 5s nếu có file nào đang ở trạng thái "processing"
  useEffect(() => {
    const hasProcessing = documents.some(
      (doc) => doc.status.toLowerCase() === "processing"
    );
    if (!hasProcessing) return;

    const interval = setInterval(() => {
      fetchDocs(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [documents, fetchDocs]);

  // Format date helper
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return d.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Get status class & icon
  const getStatusProps = (status: string) => {
    switch (status.toLowerCase()) {
      case "processed":
        return {
          label: "Processed",
          icon: "check_circle",
          className: "bg-[#0EE1A9]/10 text-[#0EE1A9]",
          spinning: false,
        };
      case "processing":
        return {
          label: "Processing",
          icon: "sync",
          className: "bg-[#2F80ED]/10 text-[#2F80ED]",
          spinning: true,
        };
      case "failed":
        return {
          label: "Failed",
          icon: "error",
          className: "bg-[#E05A4F]/10 text-[#E05A4F]",
          spinning: false,
        };
      case "duplicate":
        return {
          label: "Duplicate",
          icon: "warning",
          className: "bg-[#F2C94C]/10 text-[#F2C94C]",
          spinning: false,
        };
      default:
        return {
          label: status,
          icon: "help",
          className: "bg-gray-100 text-gray-600",
          spinning: false,
        };
    }
  };

  // Delete document handler
  const handleDelete = async (docId: string, fileName: string) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa tài liệu "${fileName}"? Toàn bộ nội dung chunk và embedding liên quan sẽ bị xóa hoàn toàn.`
      )
    ) {
      try {
        await deleteDocument(docId);
        fetchDocs(false);
      } catch (err: any) {
        alert(err.message || "Không thể xóa tài liệu");
      }
    }
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setUploadError(null);
    setUploadSuccess(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      validateAndAddFiles(filesArray);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    setUploadSuccess(null);
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      validateAndAddFiles(filesArray);
    }
  };

  const validateAndAddFiles = (files: File[]) => {
    const validExtensions = [".pdf", ".docx", ".txt", ".md"];
    const validFiles: File[] = [];
    let errorMsg = null;

    for (const file of files) {
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!validExtensions.includes(ext)) {
        errorMsg = `Định dạng file ${file.name} không hỗ trợ (chỉ nhận PDF, DOCX, TXT, MD).`;
        break;
      }
      if (file.size > 10 * 1024 * 1024) {
        errorMsg = `File ${file.name} vượt quá giới hạn 10MB.`;
        break;
      }
      validFiles.push(file);
    }

    if (errorMsg) {
      setUploadError(errorMsg);
    } else {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const openUploadModal = () => {
    setSelectedFiles([]);
    setKbType("other");
    setUploadError(null);
    setUploadSuccess(null);
    setIsUploading(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isUploading) return;
    setIsModalOpen(false);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const res = await uploadDocuments(selectedFiles, kbType);
      if (res && res.success) {
        setUploadSuccess("Tài liệu đã được tải lên thành công và đang được xử lý trong nền!");
        setSelectedFiles([]);
        fetchDocs(false);
        // Tự động đóng modal sau 1.5s để người dùng thấy kết quả
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1500);
      } else {
        setUploadError(res.message || "Tải lên thất bại");
      }
    } catch (err: any) {
      setUploadError(err.message || "Có lỗi xảy ra khi tải tài liệu lên backend.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex h-full flex-col bg-[#FAFBFC]">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-[28px] font-bold leading-9 tracking-tight text-black">Kho Tri Thức</h2>
            <p className="mt-1 text-[14px] leading-5 text-[#424845]">Quản lý và cập nhật cơ sở dữ liệu cho trợ lý AI.</p>
          </div>

          <button
            onClick={openUploadModal}
            className="flex items-center gap-1 rounded bg-[#00D99F] px-4 py-2 text-[12px] font-bold uppercase leading-4 tracking-wider text-[#041712] transition-colors hover:bg-[#1fe1a6] cursor-pointer"
          >
            <MaterialIcon name="add" className="text-[18px]" />
            Upload Document
          </button>
        </div>

        <div className="grid h-full gap-6 pb-8">
          <div className="flex h-full flex-col gap-6">
            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-[#e5e2e1] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between border-b border-[#e5e2e1] bg-[#F8FAFB] p-4">
                <h3 className="text-[18px] font-semibold leading-6 text-black">Tài liệu đã tải lên</h3>
                <button
                  onClick={() => fetchDocs(true)}
                  className="flex h-8 w-8 items-center justify-center rounded border border-[#c2c8c4] text-[#424845] transition-colors hover:bg-[#f6f3f2] cursor-pointer"
                  title="Làm mới"
                >
                  <MaterialIcon name="refresh" className="text-[18px]" spinning={isLoading} />
                </button>
              </div>

              <div className="flex-1 overflow-auto">
                {isLoading ? (
                  <div className="flex h-[200px] flex-col items-center justify-center text-[#424845]">
                    <MaterialIcon name="sync" className="text-[32px]" spinning />
                    <span className="mt-2 text-[14px]">Đang tải dữ liệu...</span>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="flex h-[200px] flex-col items-center justify-center text-[#424845]">
                    <MaterialIcon name="folder_open" className="text-[48px] text-gray-300" />
                    <span className="mt-2 text-[14px]">Chưa có tài liệu nào trong Kho Tri Thức</span>
                  </div>
                ) : (
                  <table className="w-full border-collapse text-left">
                    <thead className="sticky top-0 z-10 border-b border-[#E9EEF1] bg-[#F8FAFB]">
                      <tr>
                        <th className="p-4 text-[12px] font-semibold uppercase leading-4 tracking-wider text-[#424845]">Tên file</th>
                        <th className="p-4 text-[12px] font-semibold uppercase leading-4 tracking-wider text-[#424845]">Ngày tải lên</th>
                        <th className="p-4 text-[12px] font-semibold uppercase leading-4 tracking-wider text-[#424845]">Trạng thái</th>
                        <th className="p-4 text-right text-[12px] font-semibold uppercase leading-4 tracking-wider text-[#424845]">Số Chunks</th>
                        <th className="p-4 text-right text-[12px] font-semibold uppercase leading-4 tracking-wider text-[#424845]">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => {
                        const statusProps = getStatusProps(doc.status);
                        return (
                          <tr key={doc.doc_id} className="group h-[56px] border-b border-[#E9EEF1] transition-colors hover:bg-[#F4F7F9]">
                            <td className="p-4 text-[14px] font-medium leading-5 text-black">
                              <div className="flex items-center gap-2 truncate max-w-md" title={doc.file_name}>
                                <MaterialIcon name="description" className="text-[#727875] shrink-0" />
                                <span className="truncate">{doc.file_name}</span>
                              </div>
                              {doc.error_message && (
                                <p className="mt-0.5 text-[11px] text-red-500 max-w-md truncate" title={doc.error_message}>
                                  Lỗi: {doc.error_message}
                                </p>
                              )}
                            </td>
                            <td className="p-4 text-[14px] leading-5 text-[#424845]">{formatDate(doc.created_at)}</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold uppercase leading-4 tracking-wider ${statusProps.className}`}>
                                <MaterialIcon
                                  name={statusProps.icon}
                                  className="text-[14px]"
                                  spinning={statusProps.spinning}
                                />
                                {statusProps.label}
                              </span>
                            </td>
                            <td className="p-4 text-right text-[14px] leading-5 text-[#424845]">
                              {doc.status.toLowerCase() === "processing" ? "-" : doc.chunk_count}
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDelete(doc.doc_id, doc.file_name)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                title="Xóa tài liệu"
                              >
                                <MaterialIcon name="delete" className="text-[18px]" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div
            className="w-full max-w-lg rounded-xl border border-[#e5e2e1] bg-white p-6 shadow-2xl relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E9EEF1] pb-3 mb-4">
              <h3 className="text-[18px] font-bold text-black flex items-center gap-2">
                <MaterialIcon name="cloud_upload" className="text-[#00D99F]" />
                Tải Lên Tài Liệu Tri Thức
              </h3>
              <button
                onClick={closeModal}
                disabled={isUploading}
                className="text-gray-400 hover:text-black transition-colors cursor-pointer disabled:opacity-50"
              >
                <MaterialIcon name="close" className="text-[20px]" />
              </button>
            </div>

            {/* Select KB Type */}
            <div className="mb-4">
              <label className="block text-[12px] font-bold uppercase tracking-wider text-[#424845] mb-1.5">
                Phân loại tài liệu
              </label>
              <select
                value={kbType}
                onChange={(e) => setKbType(e.target.value)}
                disabled={isUploading}
                className="w-full rounded border border-[#c2c8c4] bg-[#F8FAFB] px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#00D99F] disabled:opacity-50"
              >
                <option value="other">Khác / Tài liệu chung (Other)</option>
                <option value="faq">Câu hỏi thường gặp (FAQ)</option>
                <option value="policy">Chính sách & Quy định (Policy)</option>
                <option value="product">Thông tin sản phẩm (Product)</option>
              </select>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
                isDragging
                  ? "border-[#00D99F] bg-[#00D99F]/5"
                  : "border-[#c2c8c4] bg-[#F8FAFB] hover:border-[#00D99F]"
              } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                className="hidden"
                accept=".pdf,.docx,.txt,.md"
              />
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E9EEF1] text-[#424845]">
                <MaterialIcon name="upload_file" className="text-[28px]" />
              </div>
              <h4 className="mb-1 text-[16px] font-semibold text-black">Kéo thả PDF / DOCX / TXT / MD</h4>
              <p className="max-w-xs text-center text-[12px] leading-4 text-[#424845]">
                hoặc click để duyệt file từ máy tính. Hỗ trợ PDF, DOCX, TXT, MD. Tối đa 10MB mỗi file.
              </p>
            </div>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
              <div className="mt-4 max-h-[140px] overflow-y-auto border border-[#E9EEF1] rounded-lg p-2 bg-[#F8FAFB]">
                <p className="text-[11px] font-bold text-[#424845] mb-2 uppercase tracking-wider">
                  File đã chọn ({selectedFiles.length})
                </p>
                <div className="flex flex-col gap-1.5">
                  {selectedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-[12px] bg-white p-2 rounded border border-[#E9EEF1]"
                    >
                      <div className="flex items-center gap-1.5 truncate pr-2">
                        <MaterialIcon name="draft" className="text-gray-400 text-[16px]" />
                        <span className="truncate font-medium">{file.name}</span>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSelectedFile(idx);
                        }}
                        disabled={isUploading}
                        className="text-red-500 hover:text-red-700 cursor-pointer disabled:opacity-50"
                      >
                        <MaterialIcon name="delete" className="text-[16px]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Response Messages */}
            {uploadError && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-[12px] text-red-700 flex items-start gap-2">
                <MaterialIcon name="error" className="text-[16px] shrink-0 text-red-500" />
                <span>{uploadError}</span>
              </div>
            )}
            {uploadSuccess && (
              <div className="mt-4 rounded-lg bg-green-50 p-3 text-[12px] text-green-700 flex items-start gap-2">
                <MaterialIcon name="check_circle" className="text-[16px] shrink-0 text-green-500" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 border-t border-[#E9EEF1] pt-4">
              <button
                onClick={closeModal}
                disabled={isUploading}
                className="rounded border border-[#c2c8c4] px-4 py-2 text-[12px] font-bold uppercase text-[#424845] hover:bg-[#f6f3f2] transition-colors cursor-pointer disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading || selectedFiles.length === 0}
                className="flex items-center gap-1 rounded bg-[#00D99F] px-4 py-2 text-[12px] font-bold uppercase text-[#041712] hover:bg-[#1fe1a6] transition-colors cursor-pointer disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <MaterialIcon name="sync" className="text-[16px]" spinning />
                    Đang tải lên...
                  </>
                ) : (
                  <>
                    <MaterialIcon name="publish" className="text-[16px]" />
                    Tải lên
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
