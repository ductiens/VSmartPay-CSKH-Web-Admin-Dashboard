// Development bypass utility
// Use this to quickly test the app without logging in

export const setDevBypass = () => {
  const mockUser = {
    id: "dev-001",
    username: "admin",
    email: "admin@vsmartpay.com",
    firstName: "Admin",
    lastName: "User",
    gender: "M",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlq8RyfY-Sza4GTaSJpN8e-FG3qJ0MQgmnjCdyUa_AXOhOFTDrRm04L6ZtRwYwjQtn00hxSyNiloL7o_ltMjdic_COsAxpU8UA1igqnmUO6pqrkpSwxL9c6tIKHQrOnSQIMwDU7R0ryWgZBsaCh3ew66YtHROXnThMtGBWZaO9OBqaQj2d-NyPxrpz-6mFfe_3aLJd2RlZA8OgHncwbcY-tGewvCcuxelK2kX90vs4QJh5YKMrFxFcHk3cdTYkhDVGpTdMpkO60TI",
  };

  localStorage.setItem("accessToken", "dev-token-12345");
  localStorage.setItem("refreshToken", "dev-refresh-token-12345");
  localStorage.setItem("user", JSON.stringify(mockUser));

  // Reload to apply changes
  window.location.reload();
};

export const clearDevBypass = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  window.location.reload();
};
