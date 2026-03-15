export const purgeSession = () => {
  sessionStorage.clear();
  window.location.href = "/login";
};