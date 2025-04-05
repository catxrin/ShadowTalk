export default function ColorOption({ option, color, ...rest }) {
  return (
    <div {...rest}>
      <p className='text-sm text-gray-300'>{option}</p>
      <div className={`${color} rounded p-5`}></div>
    </div>
  );
}
