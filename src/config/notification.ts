import type { NotificationArgsProps } from "antd";
import { notification } from "antd";
import tokenManager from "../common/utils/token-manager";
import notificationBadge from "../service/notification-badge";

type NotificationPlacement = NotificationArgsProps["placement"];

const defaultPlacement: NotificationPlacement = "topRight";

// Cấu hình thông báo
const notify = {
  success: (
    // message: string,
    description?: string,
  ) => {
    notification.success({
      message: "Thành công",
      description,
      placement: defaultPlacement,
      duration: 1,
      showProgress: true,
      style: {
        backgroundColor: "#f0fdf4",
        borderRadius: "5px",
      },
    });
  },
  error: (
    // message: string,
    description?: string,
  ) => {
    const isLogged = !!tokenManager.getAccessToken();
    if (isLogged) {
      // For errors, increment the header badge and track error message
      notificationBadge.addError(description || "Đã xảy ra lỗi");
    } else {
      notification.error({
        message: "Lỗi",
        description: description || "Đã xảy ra lỗi",
        placement: defaultPlacement,
        duration: 3,
        showProgress: true,
        style: {
          backgroundColor: "#fef2f2",
          borderRadius: "5px",
        },
      });
    }
  },
  warning: (
    // message: string,
    description?: string,
  ) => {
    const isLogged = !!tokenManager.getAccessToken();
    if (isLogged) {
      // For warnings, increment the header badge and track warning message
      notificationBadge.addWarning(description || "Cảnh báo");
    } else {
      notification.warning({
        message: "Cảnh báo",
        description: description || "Cảnh báo",
        placement: defaultPlacement,
        duration: 3,
        showProgress: true,
        style: {
          backgroundColor: "#fffbeb",
          borderRadius: "5px",
        },
      });
    }
  },
  info: (
    // message: string,
    description?: string,
  ) => {
    notification.info({
      message: "Thông báo",
      description,
      placement: defaultPlacement,
      duration: 2,
      showProgress: true,
      style: {
        backgroundColor: "#eff6ff",
        borderRadius: "5px",
      },
    });
  },
};

export default notify;
