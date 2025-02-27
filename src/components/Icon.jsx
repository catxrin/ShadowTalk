export default function Icon({ icon, styles, pointer = true, ...rest }) {
  return (
    <span {...rest} className={`material-symbols-outlined ${pointer && 'cursor-pointer'} ${styles}`}>
      {icon}
    </span>
  );
}
