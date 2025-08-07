import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [tab, setTab] = useState('');

  const tabStyle = path => (tab === path ? 'bg-white/10' : 'hover:bg-white/10');

  useEffect(() => {
    const currentTab = location.pathname.split('settings/')[1];
    setTab(currentTab);
  }, [location]);

  return (
    <div className='flex flex-col gap-1 text-gray-200 '>
      <p
        onClick={() => navigate('customization')}
        className={`cursor-pointer rounded py-3 ${tabStyle('customization')} px-2`}
      >
        {t('Customization')}
      </p>
      <p onClick={() => navigate('language')} className={`cursor-pointer rounded py-3 ${tabStyle('language')} px-2`}>
        {t('Language')}
      </p>
      <p
        onClick={() => navigate('danger_zone')}
        className={`cursor-pointer rounded py-3 ${tabStyle('danger_zone')} px-2`}
      >
        {t('Danger Zone')}
      </p>
    </div>
  );
}
