import { Link, NavLink } from 'react-router-dom';

export default function DesktopNavigation() {
  return (
    <nav className='fixed xl:block hidden top-0 z-50 shadow-sm shadow-white/1 bg-black/10 w-full py-3 px-92 backdrop-blur-2xl'>
      <ul className='flex lex-row items-center gap-20 text-white w-full justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <img className='h-7 w-8 p-1 bg-white/80 rounded' src='logoSVG.svg' alt='logo' />
          <p className='font-[nuosu] text-lg'>ShadowTalk</p>
        </div>

        <div className='flex flex-row gap-10 items-center'>
          <NavLink to='/' className='text-[15px] font-semibold'>
            Home
          </NavLink>
          <NavLink className='text-[15px] font-semibold'>About</NavLink>
          <NavLink className='text-[15px] font-semibold'>Contacts</NavLink>
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
