import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const items = [
    {
      key: "vi",
      label: "🇻🇳 Tiếng Việt",
      onClick: () => i18n.changeLanguage("vi"),
    },
    {
      key: "en",
      label: "🇺🇸 English",
      onClick: () => i18n.changeLanguage("en"),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button>
        🌐 {i18n.language.toUpperCase()} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default memo(LanguageSwitcher);