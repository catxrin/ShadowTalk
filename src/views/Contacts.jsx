import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Icon from '../components/Icon';

export default function Contacts() {
  return (
    <section
      id='contacts'
      className='w-full relative flex p-6 bg-transparent border-b-[1px] border-white flex-row justify-center items-center xl:gap-72 gap-6 xl:h-68 h-28'
    >
      <HashLink to='#home' className='flex flex-row justify-center items-center gap-2'>
        <img className='xl:h-12 xl:w-12 h-6 w-6 xl:px-2 px-1 bg-white/80 rounded' src='logoSVG.svg' alt='logo' />
        <p className='font-[nuosu] xl:text-lg xl:block hidden'>ShadowTalk</p>
      </HashLink>
      <div className='flex flex-row xl:gap-5 gap-2 items-center'>
        <HashLink smooth to='#home' className='xl:text-base text-sm'>
          Home
        </HashLink>
        <div className='xl:min-h-8 min-h-5 w-0.5 bg-gray-400'></div>
        <HashLink smooth to='#about' className='xl:text-base text-sm'>
          About
        </HashLink>
        <div className='xl:min-h-8 min-h-5 w-0.5 bg-gray-400'></div>
        <HashLink smooth to='#contacts' className='xl:text-base text-sm'>
          Contacts
        </HashLink>
      </div>
      <Link to='https://github.com/catxrin'>
        <img className='invert grayscale xl:h-10 h-6' src='githubIcon.svg' alt='github' />
      </Link>
      <div className='absolute flex gap-1 flex-row items-center bottom-2 right-4 xl:text-sm text-[10px] font-semibold'>
        <p className='flex flex-row items-center gap-1'>
          Made with <Icon styles='xl:!text-lg !text-sm' icon='favorite' /> by
        </p>
        <Link to='https://github.com/catxrin' className='underline italic'>
          catxrin
        </Link>
      </div>
    </section>
  );
}
