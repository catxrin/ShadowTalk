export default function Icon({ icon, styles, pointer = true, ...rest }) {
  return (
    <p {...rest} className={`material-symbols-outlined ${pointer && 'cursor-pointer'} ${styles}`}>
      {icon}
    </p>
  );
}
