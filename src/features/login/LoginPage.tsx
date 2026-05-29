import { Button, Form, Input, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../auth/auth.mutation";
import { setCredentials } from "../../redux/auth/slice";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/buttons/ButtonChangeLanguage";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();
  const { t } = useTranslation();
  const onFinish = (values: any) => {
    mutate(values, {
      onSuccess: (data) => {
        console.log("LOGIN RESPONSE:", data);

        dispatch(
          setCredentials({
            user: {
              id: data.id,
              username: data.username,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: data.gender,
              image: data.image,
            },
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }),
        );

        navigate("/");
      },
      onError: (err: any) => {
        message.error(err.message || "Login failed");
      },
    });
  };
  const now = dayjs().format("{YYYY} MM-DDTHH:mm:ss SSS [Z] A"); // display
  console.log("ngày và giờ", now);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LanguageSwitcher/>
      <div>{now}</div>
      <Card title={t("auth.login")} className="w-96">
     
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isPending}>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
