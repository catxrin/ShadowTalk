export default function ErrorMessage({ error, styles }) {
  return <p className={`text-red-600 text-sm font-semibold ${styles}`}>{error}</p>;
}
