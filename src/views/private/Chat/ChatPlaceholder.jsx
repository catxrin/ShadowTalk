import { useTranslation } from 'react-i18next';

export default function ChatPlaceholder() {
  const { t } = useTranslation();

  return (
    <p className='xl:text-base text-sm flex justify-center items-center min-h-full w-full text-gray-300 font-semibold'>
      {t('It’s quiet here... Say hello or ask a question to get started!')} &#10024;
    </p>
  );
}
