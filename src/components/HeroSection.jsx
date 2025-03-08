import Icon from './Icon';
export default function HeroSection({ icon, title, description }) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='font-semibold flex flex-row gap-2 items-center'>
        <Icon icon={icon} /> <p>{title}</p>
      </div>
      <div className='flex ml-3 flex-row items-center gap-2'>
        <div className='min-h-12 w-0.5 bg-white'></div>
        <p className='italic pl-2'>{description}</p>
      </div>
    </div>
  );
}
