export default function Icon({ icon, styles, pointer = true, fill, ...rest }) {
  return (
    <p
      {...rest}
      style={{ fontVariationSettings: `'FILL' ${fill ? 1 : 0}` }}
      className={`material-symbols-rounded ${pointer && 'cursor-pointer'} ${styles}`}
    >
      {icon}
    </p>
  );
}
