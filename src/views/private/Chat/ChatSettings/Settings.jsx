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
    <div className='h-screen w-screen md:w-84 bg-[#1C1D22] py-4 px-1.5 flex gap-4 flex-col'>
      <div className='flex flex-row items-center gap-2 px-1.5'>
        <img className='h-7 w-8 p-1 bg-white/80 rounded' src='/logoSVG.svg' alt='logo' />
        <p className='font-[nuosu] text-white text-sm'>ShadowTalk</p>
      </div>
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
    </div>
  );
}
