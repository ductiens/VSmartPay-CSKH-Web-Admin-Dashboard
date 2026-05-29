import { MainLayout } from "../../components/layout";

const documents = [
  {
    fileName: "HDSD_VsmartPay_v2.pdf",
    type: "Technical",
    status: "Processed",
    statusIcon: "check_circle",
    chunks: "120",
    statusClass: "bg-[#0EE1A9]/10 text-[#0EE1A9]",
  },
  {
    fileName: "Chinh_sach_bao_mat_2024.docx",
    type: "Policy",
    status: "Processing",
    statusIcon: "sync",
    chunks: "-",
    statusClass: "bg-[#2F80ED]/10 text-[#2F80ED]",
    spinning: true,
  },
  {
    fileName: "FAQ_KhachHang_Q1.pdf",
    type: "FAQ",
    status: "Failed",
    statusIcon: "error",
    chunks: "45",
    statusClass: "bg-[#E05A4F]/10 text-[#E05A4F]",
  },
  {
    fileName: "API_Integration_Guide.pdf",
    type: "Technical",
    status: "Processed",
    statusIcon: "check_circle",
    chunks: "215",
    statusClass: "bg-[#0EE1A9]/10 text-[#0EE1A9]",
  },
];

const healthItems = [
  { label: "Index", value: "vsmart_prod_v2", chip: true },
  { label: "Model", value: "text-embedding-3-small", chip: true },
  { label: "Top_K", value: "5", strong: true },
];

function MaterialIcon({ name, className = "" }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}

export default function KnowledgeBasePage() {
  return (
    <MainLayout>
      <div className="flex h-full flex-col bg-[#FAFBFC]">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-[28px] font-bold leading-9 tracking-tight text-black">Kho Tri Thức</h2>
            <p className="mt-1 text-[14px] leading-5 text-[#424845]">Quản lý và cập nhật cơ sở dữ liệu cho trợ lý AI.</p>
          </div>

          <button className="flex items-center gap-1 rounded bg-[#00D99F] px-4 py-2 text-[12px] font-bold uppercase leading-4 tracking-wider text-[#041712] transition-colors hover:bg-[#1fe1a6]">
            <MaterialIcon name="add" className="text-[18px]" />
            Upload Document
          </button>
        </div>

        <div className="grid h-full grid-cols-12 gap-6 pb-8">
          <div className="col-span-8 flex h-full flex-col gap-6">
            <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#c2c8c4] bg-[#F8FAFB] p-8 transition-colors hover:border-[#00D99F]">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E9EEF1] text-[#424845]">
                <MaterialIcon name="cloud_upload" className="text-[32px]" />
              </div>
              <h3 className="mb-1 text-[18px] font-semibold leading-6 text-black">Drag & Drop PDF/Docx</h3>
              <p className="max-w-md text-center text-[14px] leading-5 text-[#424845]">
                Kéo thả tài liệu vào đây hoặc click để duyệt file. Hỗ trợ định dạng PDF, DOCX. Tối đa 50MB.
              </p>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-[#e5e2e1] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between border-b border-[#e5e2e1] bg-[#F8FAFB] p-4">
                <h3 className="text-[18px] font-semibold leading-6 text-black">Tài liệu đã tải lên</h3>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-[#c2c8c4] text-[#424845] transition-colors hover:bg-[#f6f3f2]">
                  <MaterialIcon name="filter_list" className="text-[18px]" />
                </button>
              </div>

              <div className="flex-1 overflow-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="sticky top-0 z-10 border-b border-[#E9EEF1] bg-[#F8FAFB]">
                    <tr>
                      <th className="p-4 text-[12px] font-semibold uppercase leading-4 tracking-wider text-[#424845]">File Name</th>
                      <th className="p-4 text-[12px] font-semibold uppercase leading-4 tracking-wider text-[#424845]">KB Type</th>
                      <th className="p-4 text-[12px] font-semibold uppercase leading-4 tracking-wider text-[#424845]">Status</th>
                      <th className="p-4 text-right text-[12px] font-semibold uppercase leading-4 tracking-wider text-[#424845]">Chunks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.fileName} className="group h-[56px] border-b border-[#E9EEF1] transition-colors hover:bg-[#F4F7F9]">
                        <td className="flex items-center gap-2 p-4 text-[14px] font-medium leading-5 text-black">
                          <MaterialIcon name="description" className="text-[#727875]" />
                          {doc.fileName}
                        </td>
                        <td className="p-4 text-[14px] leading-5 text-[#424845]">{doc.type}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold uppercase leading-4 tracking-wider ${doc.statusClass}`}>
                            <MaterialIcon name={doc.statusIcon} className={`text-[14px] ${doc.spinning ? "animate-pulse" : ""}`} />
                            {doc.status}
                          </span>
                        </td>
                        <td className="p-4 text-right text-[14px] leading-5 text-[#424845]">{doc.chunks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-6">
            <div className="overflow-hidden rounded-xl border border-[#e5e2e1] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
              <div className="border-b border-[#e5e2e1] bg-gradient-to-br from-[#0b1f1a] to-[#002116] p-6 text-white">
                <div className="mb-2 flex items-center gap-2">
                  <MaterialIcon name="database" className="text-[#00D99F]" />
                  <h3 className="text-[20px] font-bold leading-7">Vector Search Health</h3>
                </div>
                <p className="text-[14px] leading-5 text-[#9fd1ba] opacity-80">System embedding status & metrics</p>
              </div>

              <div className="flex flex-col gap-4 p-6">
                {healthItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-[#E9EEF1] py-2">
                    <span className="text-[12px] font-semibold uppercase leading-4 tracking-wider text-[#424845]">{item.label}</span>
                    <span
                      className={
                        item.chip
                          ? "rounded border border-[#E9EEF1] bg-[#F4F7F9] px-1 py-[2px] font-mono text-[14px] leading-5 text-black"
                          : item.strong
                            ? "text-[14px] font-bold leading-5 text-black"
                            : "text-[14px] leading-5 text-black"
                      }
                    >
                      {item.value}
                    </span>
                  </div>
                ))}

                <div className="py-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[12px] font-semibold uppercase leading-4 tracking-wider text-[#424845]">Retrieval Quality</span>
                    <span className="text-[14px] font-bold leading-5 text-[#00D99F]">94%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#E9EEF1]">
                    <div className="h-full w-[94%] rounded-full bg-[#00D99F]" />
                  </div>
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-1 rounded border border-[#00D99F] bg-transparent px-4 py-2 text-[12px] font-bold uppercase leading-4 tracking-wider text-[#041712] transition-colors hover:bg-[#00D99F]/10">
                  <MaterialIcon name="autorenew" className="text-[18px]" />
                  Rebuild Index
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
