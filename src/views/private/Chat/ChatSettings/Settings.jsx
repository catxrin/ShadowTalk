import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [tab, setTab] = useState('');

  const tabStyle = path => (tab === path ? 'bg-secondary' : 'hover:bg-secondary');

  useEffect(() => {
    const currentTab = location.pathname.split('settings/')[1];
    setTab(currentTab);
  }, [location]);

  return (
    <div className='flex flex-col gap-1 text-normal'>
      <p
        onClick={() => navigate('customization')}
        className={`cursor-pointer rounded py-3 ${tabStyle('customization')} px-2`}
      >
        {t('Customization')}
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
