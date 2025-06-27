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
            className={`border p-1 xl:text-base text-sm rounded-md w-full outline-none ${
              !errors[name] ? 'border-gray-500' : 'border-red-600'
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
