import { useState } from 'react';

import Icon from '../Icon';
import ErrorMessage from '../ErrorMessage';
import ConnectForm from './ConnectForm';

export default function PasswordInput() {
  const [visible, setVisible] = useState(false);
  const visibilityIcon = () => (!visible ? 'visibility_off' : 'visibility');
  const inputType = () => (!visible ? 'password' : 'text');

  return (
    <div className='flex flex-row w-full relative'>
      <div className='w-full'>
        <ConnectForm>
          {({ register, formState: { errors } }) => (
            <div className='flex flex-col'>
              <label className='text-gray-400 text-sm font-semibold' htmlFor='password'>
                Password
              </label>
              <div className='flex flex-row relative'>
                <input
                  placeholder=' ••••••••'
                  type={inputType()}
                  className={`border p-1 rounded-md border-gray-500 ${
                    !errors['password'] ? 'border-gray-500' : 'border-red-600'
                  } pr-12 relative w-full`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must contain at least 8 characters' },
                  })}
                />
                <Icon
                  icon={visibilityIcon()}
                  onClick={() => setVisible(prev => !prev)}
                  styles='absolute right-3 bottom-1'
                />
              </div>
              {errors['password'] && <ErrorMessage error={errors['password'].message} />}
            </div>
          )}
        </ConnectForm>
      </div>
    </div>
  );
}
