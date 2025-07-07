import ErrorMessage from '../ErrorMessage';
import ConnectForm from './ConnectForm';

export default function Textarea({ name, rules, label, placeholder, styles, ...rest }) {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => (
        <div className='flex flex-col w-full'>
          <label className='text-gray-400 text-sm font-semibold' htmlFor={name}>
            {label}
          </label>
          <textarea
            placeholder={placeholder}
            rows='5'
            className={`shadow-sm py-1 bg-white/10 px-1.5 xl:text-base text-sm rounded-md w-full outline-none ${
              !errors[name] && 'border-red-600'
            } ${styles && styles}`}
            {...rest}
            {...register(name, rules)}
          />
          {errors[name] && <ErrorMessage error={errors[name].message} />}
        </div>
      )}
    </ConnectForm>
  );
}
