import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ConnectForm from './ConnectForm';

export default function MediaInput({ defaultImage, name }) {
  const [preview, setPreview] = useState(defaultImage);
  const { t } = useTranslation();

  return (
    <ConnectForm>
      {({ register }) => (
        <div className='flex flex-row w-full justify-between items-center'>
          <img
            className='rounded-full w-20 h-20 object-cover'
            src={preview?.includes('blob:') ? preview : `/server/${preview}`}
            alt='pfp'
          />
          <label className='bg-black/30 text-sm text-gray-200 p-2 rounded cursor-pointer' htmlFor={name}>
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
