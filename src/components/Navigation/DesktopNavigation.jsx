import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function DesktopNavigation() {
  return (
    <nav className='fixed xl:block hidden top-0 z-50 shadow-sm shadow-white/1 bg-black/10 w-full py-3 px-92 backdrop-blur-2xl'>
      <ul className='flex lex-row items-center gap-20 text-white w-full justify-between'>
        <Link to='/' className='flex flex-row items-center gap-2'>
          <img className='h-7 w-8 p-1 bg-white/80 rounded' src='logoSVG.svg' alt='logo' />
          <p className='font-[nuosu] text-lg'>ShadowTalk</p>
        </Link>

        <div className='flex flex-row gap-10 items-center'>
          <HashLink smooth to='/#home' className='text-[15px] font-semibold'>
            Home
          </HashLink>
          <HashLink smooth to='/#about' className='text-[15px] font-semibold'>
            About
          </HashLink>
          <HashLink smooth to='/#contacts' className='text-[15px] font-semibold'>
            Contacts
          </HashLink>
        </div>
        <div className='flex flex-row gap-5'>
          <Link
            to='login'
            className='rounded-3xl text-[15px] bg-white font-semibold border border-white text-black px-3 py-1.5'
          >
            Login
          </Link>
          <Link
            to='/register'
            className='rounded-3xl text-[15px] bg-white font-semibold border text-black border-white px-3 py-1.5'
          >
            Register
          </Link>
        </div>
      </ul>
    </nav>
  );
}
