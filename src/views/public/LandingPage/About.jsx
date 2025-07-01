import { useTranslation } from 'react-i18next';

import HeroSection from '../../../components/HeroSection';
import Shape from '../../../components/Shape';

export default function About() {
  const { t } = useTranslation();

  return (
    <section
      id='about'
      className='w-full flex p-6 flex-row justify-center items-center gap-20 overflow-hidden relative xl:min-h-[90vh] min-h-[80vh]'
    >
      <Shape position='xl:-top-60 -top-[30rem] -left-20 blur-[100px] xl:max-h-full xl:max-w-full max-h-40 max-w-40' />
      <Shape position='xl:-bottom-30 xl:-right-32 -bottom-20 -right-52 blur-[100px] xl:max-h-full xl:max-w-full max-h-40 max-w-40' />
      <div className='flex absolute xl:top-14 z-40 xl:left-14 top-10 left-7 flex-row gap-3'>
        <div className='xl:p-1.5 p-1 bg-gray-200 rounded-full'></div>
        <div className='xl:p-1.5 p-1  bg-gray-400 rounded-full'></div>
        <div className='xl:p-1.5 p-1 bg-gray-500 rounded-full'></div>
      </div>
      <div className='max-w-[30rem] flex flex-col gap-4'>
        <h1 className='font-semibold text-xl text-white'>{t('Why Shadow Talk?')}</h1>
        <HeroSection
          icon='favorite'
          title={t('Built for Dark Mode Lovers')}
          description={t('A beautifully crafted, eye-friendly interface that looks stunning, day or night.')}
        />
        <HeroSection
          icon='rocket_launch'
          title={t('Fast & Lightweight')}
          description={t('No bloated features—just pure, seamless messaging that keeps up with your conversations.')}
        />
        <HeroSection
          icon='palette'
          title={t('Express Yourself')}
          description={t(
            'Your Way Customizable themes, stylish fonts, and a chat experience that reflects your personality.'
          )}
        />
        <HeroSection
          icon='public'
          title={t('Connect Instantly')}
          description={t(
            "Whether you're chatting one-on-one or in a group, Shadow Talk makes communication effortless across all your devices."
          )}
        />
      </div>
      <div className='relative xl:block hidden'>
        <img className='max-w-96 rounded z-40 grayscale relative' src='phone.jpg' alt='phone' />
        <img className='max-w-96 rounded absolute top-5 grayscale blur-xs left-10' src='phone.jpg' alt='phone' />
      </div>
    </section>
  );
}
