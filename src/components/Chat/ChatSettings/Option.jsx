import Icon from '../../Icon';
export default function Option({ label, icon, description }) {
  return (
    <div className='flex flex-row gap-2 hover:bg-white/5 hover:cursor-pointer py-3 px-2 rounded'>
      <div className='bg-red-700 rounded min-h-full flex items-center px-1'>
        <Icon styles='text-red-200' icon={icon} />
      </div>
      <div className='flex flex-col gap-1'>
        <h1>{label}</h1>
        <p className='text-sm text-gray-200'>{description}</p>
      </div>
    </div>
  );
}
