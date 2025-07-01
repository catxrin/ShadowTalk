import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function ColorOption({ option, primary, secondary, active, ...rest }) {
  const { register } = useForm();

  const { t } = useTranslation();

  return (
    <div className={`${active && `rounded ${secondary} font-semibold`} p-1.5 text-white`}>
      <p className='text-sm'>{t(option)}</p>
      <div {...rest} {...register('theme')} className={`${primary} rounded p-5 cursor-pointer`}></div>
    </div>
  );
}
