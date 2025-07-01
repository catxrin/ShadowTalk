import { useTranslation } from 'react-i18next';

export default function Placeholder() {
  const { t } = useTranslation();

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <p className='text-gray-300 xl:text-lg text-sm text-center'>{t('No chat selected. Start a conversation!')}</p>
    </div>
  );
}
