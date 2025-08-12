import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ConnectForm from './ConnectForm';

export default function MediaInput({ defaultImage, name }) {
  const { t } = useTranslation();

  const [preview, setPreview] = useState(defaultImage);

  return (
    <ConnectForm>
      {({ register }) => (
        <div className='flex flex-row w-full justify-between items-center'>
          <img
            className='rounded-full shadow-sm w-20 h-20 object-cover'
            src={preview?.includes('blob:') ? preview : `/server/${preview}`}
            alt='pfp'
          />
          <label className='bg-primary text-sm text-normal p-2 rounded cursor-pointer' htmlFor={name}>
            {t('Change')}
          </label>
          <input
            id={name}
            name={name}
            type='file'
            className='hidden'
            {...register(name, {
              onChange: e => {
                const image = URL.createObjectURL(e.target.files[0]);
                setPreview(image);
              },
            })}
          />
        </div>
      )}
    </ConnectForm>
  );
}
