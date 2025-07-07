import ConnectForm from './ConnectForm';
import ErrorMessage from '../ErrorMessage';
import Icon from '../Icon';

export default function ButtonInput({ name, rules, label, placeholder, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => (
        <div className='flex flex-col w-full'>
          <label className='text-gray-400 text-sm font-semibold' htmlFor={name}>
            {label}
          </label>
          <div className='flex flex-row'>
            <input
              {...rest}
              // {...register(name, rules)}
              placeholder={placeholder}
              className={`border-t border-l border-b p-1 xl:text-base text-sm rounded-l-md w-full outline-none ${
                !errors[name] ? 'border-gray-500' : 'border-red-600'
              } ${styles}`}
            />
            <button className='flex bg-black/50 text-sm font-semibold h-full items-center rounded-r px-2 cursor-pointer'>
              <Icon styles='!text-xl' icon='Add' />
            </button>
          </div>
          {errors[name] && <ErrorMessage error={errors[name].message} />}
        </div>
      )}
    </ConnectForm>
  );
}
