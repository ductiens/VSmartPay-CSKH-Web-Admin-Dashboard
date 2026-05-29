export interface IPagination<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  items: T[];
}

export interface IResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message: string;
}

export type IResponsePagination<T> = IResponse<IPagination<T>>;

export interface DataResponse {
  reports: Report[];
}
export interface IReportValue {
  name: string;
  value: string;
  chartType?: string;
}
export interface IReport {
  c_order: number;
  title: string;
  idBaoCao: number;
  tenBaoCao: string;
  idDonVi: number;
  tenDonVi: string;
  idThoiGian: number;
  tenThoiGian: {
    name: string;
  };
  idChiTieu: number;
  tenChiTieu: string;
  values: IReportValue[];
}
export interface IReportData {
  reports: IReport[];
}
export interface InfoItem {
  label?: string | null;
  value?: string | number;
  valueUnit?: string;
  change?: number | null;
  changeUnit?: string | null;
}
export interface IKpiSummary {
  idBaoCao?: number;
  name: string;
  valueUnit?: string;
  value?: number | string;
  showChange?: boolean;
  showUnit?: boolean;
  change?: number | null;
  changeUnit?: string | null;
  description?: string;
  infoItems?: InfoItem[];
  iD_ChiTieu?: number | string;
}

export interface ExportExcelNode {
  idBaoCao: number;
  tenBaoCao: string;
  idParent: number | null;
  idThuocTinh: number | null;
  level: number;
  children: ExportExcelNode[];
}
