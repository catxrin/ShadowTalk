import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function UpdateIndicator() {
  const { reset } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className='flex left-0 right-0 m-auto text-sm font-semibold flex-row justify-between items-center shadow-sm w-5/10 bg-[#40414e] rounded px-4 py-3 absolute bottom-10'>
      <p>{t('You have unsaved changes!')}</p>
      <div className='flex flex-row gap-3 text-sm font-semibold'>
        <button
          onClick={() => reset()}
          className='px-2.5 cursor-pointer py-1 text-white border-white/15 border shadow-sm rounded'
        >
          {t('Reset')}
        </button>
        <button type='submit' className='px-2.5 cursor-pointer py-1 text-white bg-indigo-500 shadow-sm rounded'>
          {t('Save Changes')}
        </button>
      </div>
    </div>
  );
}
