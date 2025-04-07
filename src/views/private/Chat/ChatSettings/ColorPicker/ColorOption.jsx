import { useForm } from 'react-hook-form';

export default function ColorOption({ option, primary, secondary, active, ...rest }) {
  const { register } = useForm();

  return (
    <div className={`${active && `rounded ${secondary} font-semibold`} p-1.5 text-white`}>
      <p className='text-sm'>{option}</p>
      <div {...rest} {...register('theme')} className={`${primary} rounded p-5 cursor-pointer`}></div>
    </div>
  );
}
