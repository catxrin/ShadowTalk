import Icon from '../Icon';
import { useState } from 'react';

export default function MobileNavigation() {
  const [visible, setVisible] = useState(false);
  const changeVisibility = () => setVisible(prev => !prev);

  return (
    <div className='xl:hidden flex'>
      <nav className='fixed flex justify-between shadow-sm shadow-white/1 top-0 z-50 bg-black/10 w-full py-2.5 px-4 text-white backdrop-blur-2xl'>
        <div className='flex flex-row items-center gap-1'>
          <img className='h-6 w-7' src='logo.png' alt='logo' />
          <p className='font-semibold text-sm'>ShadowTalk</p>
        </div>
        <Icon onClick={changeVisibility} icon='menu' />
      </nav>
      {visible && (
        <div onClick={changeVisibility} className='z-50 absolute min-w-screen size-full backdrop-blur-lg'>
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            className='rounded-l-3xl absolute bg-[#171718] text-gray-300 h-screen min-w-88 right-0'
          >
            <div className='size-full flex flex-col py-5 px-6 gap-3'>
              <div className='flex w-full justify-between'>
                <div className='flex flex-row items-center gap-1'>
                  <img className='h-6 w-7' src='logo.png' alt='logo' />
                  <p className='font-semibold text-sm'>ShadowTalk</p>
                </div>
                <Icon styles='bg-white/10 text-sm p-1 rounded-lg' onClick={changeVisibility} icon='close' />
              </div>
              <div className='flex flex-col gap-4 px-2'>
                <div className='border-b-[1px] cursor-pointer border-gray-600 py-3'>Home</div>
                <div className='border-b-[1px] cursor-pointer border-gray-600 py-3'>About</div>
                <div className='border-b-[1px] cursor-pointer border-gray-600 py-3'>Contacts</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
