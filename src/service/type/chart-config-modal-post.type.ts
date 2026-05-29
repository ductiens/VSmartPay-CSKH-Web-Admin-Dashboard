// export interface TreeNode {
//   title: string;
//   value: string | number;
//   key: string | number;
//   children?: TreeNode[];
// }

// export interface YearNode {
//   ten: string;
//   year?: number;
//   children?: MonthNode[];
// }

// export interface MonthNode {
//   ten: string;
//   ma: string;
// }

// export interface TimeOption {
//   label: string;
//   value: string;
// }
// export interface SeriesConfig {
//   type: string;
//   dataKey: string;
//   name: string;
//   nameKey?: string;
//   yAxisId?: string;
//   stackId?: string;
//   sortOrder?: number;
//   color?: string;
//   idChiTieu?: number;
// }
// export interface ChartConfigItem {
//   type: string;
//   name: string;
//   series: SeriesConfig[];
//   isExpanded: boolean;
//   row?: number;
// }

// export interface ReportTreeNode {
//   code: string;
//   name: string;
//   id: string | number;
//   children?: ReportTreeNode[];
// }

// export interface ChiTieuTreeNode {
//   tenChiTieu: string;
//   idChiTieu: string | number;
//   parentId?: number | null;
//   children?: ChiTieuTreeNode[];
// }

// export interface AppConfigPayload {
//   idBaoCao: number;
//   listIdChiTieu: string;
//   listIdChiTieuChart: string;
//   listIdConfig: string;
//   nameConfig: string;
//   cardConfig?: Record<string, number[]> | null;
// }

// export interface TreeSelectValue {
//   label: React.ReactNode;
//   value: string | number;
//   halfChecked?: string | number[];
// }

// export interface FormValues {
//   nameConfig?: string;
//   idBaoCao?: number;
//   idDonVi?: number;
//   listIdChiTieu?: string | string[] | TreeSelectValue[];
//   listIdChiTieuChart?: string | string[] | TreeSelectValue[];
//   tenThoiGianCon?: string;
//   tenThoiGianCha?: string;
//   layout?: string;
//   charts?: ChartFormValues[];
//   xAxisLabel?: string;
//   yAxisUnit?: string;
//   angleAxis?: number;
//   cardConfig?: Record<string, number[]> | null;
// }

// export interface ChartFormValues {
//   chartCode?: string;
//   xAxisDataKey?: string;
//   chartType?: string;
//   idChiTieu?: number;
//   row?: number;
// }

// export interface ChartConfigModalProps {
//   visible: boolean;
//   onClose: () => void;
//   idBaoCao?: number;
//   initialTimeLabel?: string;
//   timeTreeData?: TreeNode[];
// }
