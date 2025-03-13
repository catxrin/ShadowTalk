import { useState } from 'react';
import ConnectForm from './ConnectForm';

export default function MediaInput({ defaultImage, name }) {
  const [preview, setPreview] = useState(defaultImage);
  return (
    <ConnectForm>
      {({ register }) => (
        <div className='flex flex-row w-full justify-between items-center'>
          <img
            className='rounded-full border border-gray-500 w-20 object-cover'
            src={preview?.includes('blob:') ? preview : `/server/${preview}`}
            alt='pfp'
          />
          <label htmlFor={name}>
            <p className='bg-black/30 text-sm text-gray-200 p-2 rounded'>Change</p>
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
