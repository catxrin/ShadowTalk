export default function DesktopNavigation() {
  return (
    <nav className='fixed xl:block hidden top-0 z-50 shadow-sm shadow-white/1 bg-black/10 w-full py-3 px-92 backdrop-blur-2xl'>
      <ul className='flex lex-row items-center gap-20 text-white w-full justify-between'>
        <div className='flex flex-row items-center gap-1'>
          <img className='h-9 w-10' src='logo.png' alt='logo' />
          <p className='font-semibold'>ShadowTalk</p>
        </div>

        <div className='flex flex-row gap-10 items-center'>
          <li className='text-[15px] font-semibold'>Home</li>
          <li className='text-[15px] font-semibold'>About</li>
          <li className='text-[15px] font-semibold'>Contacts</li>
        </div>
        <div className='flex flex-row gap-5'>
          <li className='rounded-3xl text-[15px] bg-white font-semibold border border-white text-black px-3 py-1.5'>
            Login
          </li>
          <li className='rounded-3xl text-[15px] bg-white font-semibold border text-black border-white px-3 py-1.5'>
            Register
          </li>
        </div>
      </ul>
    </nav>
  );
}
