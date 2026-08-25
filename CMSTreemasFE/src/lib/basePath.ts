// Gabungkan BASE_URL (berakhiran '/') dengan path aplikasi.
// Dipakai untuk navigasi non-router (window.location.href) yang tidak
// mengikuti basename React Router, agar tetap benar saat di-deploy di /adminpanel.
export const withBase = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
