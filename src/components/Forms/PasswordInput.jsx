import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Icon from '../Icon';
import ErrorMessage from '../ErrorMessage';
import ConnectForm from './ConnectForm';

export default function PasswordInput() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const visibilityIcon = () => (!visible ? 'visibility_off' : 'visibility');
  const inputType = () => (!visible ? 'password' : 'text');

  return (
    <div className='flex flex-row w-full relative'>
      <ConnectForm>
        {({ register, formState: { errors } }) => (
          <div className='flex flex-col w-full'>
            <label className='text-gray-400 text-sm font-semibold' htmlFor='password'>
              {t('Password')}
            </label>
            <div className='flex flex-row relative'>
              <input
                placeholder=' ••••••••'
                type={inputType()}
                className={`border p-1.5 bg-white/10 rounded-md border-none shadow-sm outline-none ${
                  errors['password'] && 'border-red-600'
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
  );
}
