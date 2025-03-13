import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import Icon from '../Icon';

export default function MobileNavigation() {
  const [visible, setVisible] = useState(false);
  const changeVisibility = () => setVisible(prev => !prev);

  return (
    <div className='fixed top-0 z-50 xl:hidden flex w-full'>
      <nav className='flex justify-between shadow-sm shadow-white/1 top-0 z-50 bg-black/10 w-full py-2.5 px-4 text-white backdrop-blur-2xl'>
        <Link to='/' className='flex flex-row items-center gap-2'>
          <img className='h-7 w-8 p-1 bg-white/80 rounded' src='logoSVG.svg' alt='logo' />
          <p className='font-[nuosu] text-lg'>ShadowTalk</p>
        </Link>
        <Icon onClick={changeVisibility} icon='menu' />
      </nav>
      {visible && (
        <div onClick={changeVisibility} className='z-50 min-h-screen min-w-screen top-0 absolute backdrop-blur-lg'>
          <div
            onClick={e => e.stopPropagation()}
            className='rounded-l-3xl absolute bg-[#1E1F22] text-gray-300 h-screen sm:min-w-88 min-w-80 right-0'
          >
            <div className='size-full flex flex-col py-5 px-6 gap-3'>
              <div className='flex w-full justify-between'>
                <div className='flex flex-row items-center gap-2'>
                  <img className='h-7 w-8 p-1 bg-white/80 rounded' src='logoSVG.svg' alt='logo' />
                  <p className='font-[nuosu] text-lg'>ShadowTalk</p>
                </div>
                <Icon styles='bg-white/10 !text-lg py-0.5 px-1.5 rounded-lg' onClick={changeVisibility} icon='close' />
              </div>
              <div className='flex flex-col gap-4 px-2'>
                <HashLink smooth to='#home' className='border-b-[1px] cursor-pointer border-gray-600 py-3'>
                  Home
                </HashLink>
                <HashLink smooth to='#about' className='border-b-[1px] cursor-pointer border-gray-600 py-3'>
                  About
                </HashLink>
                <HashLink smooth to='#contacts' className='border-b-[1px] cursor-pointer border-gray-600 py-3'>
                  Contacts
                </HashLink>
                <div className='flex flex-row py-3 justify-between gap-5 text-center w-full'>
                  <Link
                    to='/login'
                    className='rounded-3xl w-full text-[15px] bg-white font-semibold border border-white text-black px-3 py-1.5'
                  >
                    Login
                  </Link>
                  <Link
                    to='/register'
                    className='rounded-3xl w-full text-[15px] bg-white font-semibold border text-black border-white px-3 py-1.5'
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
