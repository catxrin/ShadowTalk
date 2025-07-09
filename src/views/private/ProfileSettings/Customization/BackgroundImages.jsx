import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import bgImages from '../../../../../public/bgImages.json';

export default function BackgroundImages() {
  const { watch, setValue, register } = useFormContext();
  const { t } = useTranslation();

  const selectedImage = watch('bgImage');
  const chooseImage = image => setValue('bgImage', image, { shouldDirty: true });

  return (
    <div className='flex flex-col gap-1 justify-start'>
      <p className='font-semibold'>{t('Profile Background')}</p>
      <div className='flex flex-row gap-4 flex-wrap justify-center'>
        {bgImages.map(image => (
          <div
            key={image}
            {...register('bgImage')}
            onClick={() => chooseImage(image)}
            style={{ backgroundImage: `url(/server/${image})` }}
            className={`w-60 h-40 sm:w-70 sm:h-48 ${
              selectedImage === image && 'border-2 border-white'
            } rounded bg-cover`}
          />
        ))}
      </div>
    </div>
  );
}
