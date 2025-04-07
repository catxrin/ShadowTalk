import Icon from '../../../../components/Icon';

export default function Option({ label, icon, description, color = 'bg-red-700', ...rest }) {
  return (
    <div {...rest} className='flex max-w-96 flex-row gap-2 hover:bg-white/5 hover:cursor-pointer py-3 px-2 rounded'>
      <div className={`${color} rounded flex items-center px-1`}>
        <Icon styles='text-white' icon={icon} />
      </div>
      <div className='flex flex-col gap-1'>
        <h1 className='font-medium text-white'>{label}</h1>
        <p className='text-sm text-gray-200'>{description}</p>
      </div>
    </div>
  );
}
