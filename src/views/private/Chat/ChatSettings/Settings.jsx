import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

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
        Customization
      </p>
      <p
        onClick={() => navigate('danger_zone')}
        className={`cursor-pointer rounded py-3 ${tabStyle('danger_zone')} px-2`}
      >
        Danger Zone
      </p>
    </div>
  );
}
