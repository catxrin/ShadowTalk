import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LanguageSelector from '../../../components/LanguageSelector';
import Icon from '../../../components/Icon';

export default function Language() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className='p-3 flex flex-col gap-5'>
      <div className='flex flex-row items-center gap-1 w-full'>
        <Icon onClick={() => navigate(`/chat`)} styles='text-white !text-3xl' icon='chevron_left' />
        <p className='font-semibold text-white text-xl'>{t('Language')}</p>
      </div>
      <LanguageSelector />
    </div>
  );
}
