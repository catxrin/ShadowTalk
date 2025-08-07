import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import Icon from '../../../../../components/Icon';
import ErrorMessage from '../../../../../components/ErrorMessage';

export default function Tags() {
  const { watch, register, setValue } = useFormContext();
  const tags = watch('tags');

  const [newTag, setNewTag] = useState();
  const [error, setError] = useState(false);

  const { t } = useTranslation();

  const addNewTag = () => {
    if (newTag?.length > 10) return setError('Tag can be up to 10 characters');

    if (tags?.length > 9) return setError('Up to 10 tags are allowed');

    if (error) setError(false);
    setValue('tags', [...tags, newTag]);
    setNewTag('');
  };

  return (
    <div className='flex flex-col items-start gap-7'>
      <div className='flex flex-col gap-1.5'>
        <p className='font-semibold'>{t('Tags')}</p>
        <div className='relative'>
          <div className='flex flex-row'>
            <input
              value={newTag}
              placeholder='Enter tag name...'
              onChange={e => setNewTag(e.target.value)}
              className={`shadow-sm p-1.5 xl:text-base bg-white/10 xl:w-80 text-sm rounded-l-md w-full outline-none`}
            />
            <div
              onClick={addNewTag}
              disabled={!newTag?.length > 0}
              className={`flex ${
                !newTag?.length > 0 && 'bg-gray-500'
              } bg-black/50 text-sm font-semibold min-h-full items-center rounded-r px-2 cursor-pointer`}
            >
              <Icon styles={`${!newTag?.length > 0 && 'text-gray-400'} !text-xl`} icon='Add' />
            </div>
          </div>
          {error && <ErrorMessage styles='absolute' error={error} />}
        </div>
      </div>
      <div {...register('tags')} className='flex flex-row gap-2.5'>
        {tags?.length > 0 &&
          tags?.map(tag => (
            <div
              key={tag}
              name={`tags.${tag}`}
              className='py-1 flex flex-row gap-2 cursor-pointer shadow-sm px-2 bg-white/10 rounded text-sm font-semibold'
            >
              <div>{tag}</div>
              <Icon
                icon='close_small'
                onClick={() =>
                  setValue(
                    'tags',
                    tags?.filter(tagName => tagName !== tag),
                    { shouldDirty: true }
                  )
                }
                styles='bg-white/10 rounded-full p-0.5 !text-lg !leading-none'
              />
            </div>
          ))}
      </div>
    </div>
  );
}
