import { useTranslation } from 'react-i18next';

import { formatDate } from '../../../helpers/utils';

import Tag from '../../../components/Tag';

export default function Profile({ user }) {
  const { t } = useTranslation();

  const userHasTags = user?.tags?.length > 0;

  return (
    <div className='h-full flex flex-col w-full gap-17 bg-[#242429]'>
      <img
        src={`/server/${user?.bgImage}`}
        alt='background picture'
        className='w-full flex object-cover h-36 rounded-t relative shadow-sm'
      />
      <div className='flex flex-row gap-2 items-end absolute top-25.5 left-5'>
        <img
          className='rounded-full border-5 border-[#242429] w-22 h-22 object-cover'
          src={`/server/${user?.image}`}
          alt='profile picture'
        />
        <div className='flex w-full flex-col justify-start'>
          <div className='flex gap-1.5 flex-row'>
            <p className='truncate max-w-96 text-white font-bold'>{user?.username}</p>
            <div className='bg-green-400 w-2 mt-1.5 h-2 shadow-sm rounded-full'></div>
          </div>
          <p className='text-sm/[20px] text-gray-300 font-medium'>
            {t('Member since')}: {formatDate(user?.createdAt)}
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-4 justify-center px-4 rounded-b pb-7'>
        <div className='font-normal flex flex-col gap-5'>
          {userHasTags && (
            <div className='flex flex-row gap-2 flex-wrap'>
              {user?.tags.map(tag => (
                <Tag name={tag} key={tag} />
              ))}
            </div>
          )}

          {user?.description && (
            <div className='flex flex-col gap-1'>
              <p className='font-semibold text-base'>Description</p>
              <p className='text-sm max-w-96 text-white break-all'>{user?.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
