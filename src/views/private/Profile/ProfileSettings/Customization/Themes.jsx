import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import { UserContext } from '../../../../../contexts/UserProvider';

import Icon from '../../../../../components/Icon';

export default function Themes() {
  const { user, setUser } = useContext(UserContext);
  const { setValue, register } = useFormContext();

  const { t } = useTranslation();

  const isCurrentTheme = (theme, current) => (theme === current ? 'bg-tertiary shadow-sm text-normal' : 'text-muted');

  const changeTheme = newTheme => {
    if (newTheme !== user?.theme) {
      setUser(state => ({ ...state, theme: newTheme }));
    }

    setValue('theme', newTheme, { shouldDirty: true });
  };

  return (
    <div className='flex flex-col gap-1.5'>
      <p className='text-normal font-semibold'>{t('Theme')}</p>
      <div className='flex flex-row text-normal items-start shadow-sm self-start bg-primary/50 rounded'>
        <div
          {...register('theme')}
          onClick={() => changeTheme('light')}
          className={`transition duration-500 ease-in-out gap-1.5 flex items-center py-1 px-2 rounded-l cursor-pointer ${isCurrentTheme(
            'light',
            user?.theme
          )}`}
        >
          <p>{t('Light')}</p> <Icon icon='sunny' styles='text-yellow-500 !text-xl' />
        </div>
        <div
          {...register('theme')}
          onClick={() => changeTheme('dark')}
          className={`transition duration-500 ease-in-out gap-1.5 flex items-center py-1 px-2 rounded-r cursor-pointer ${isCurrentTheme(
            'dark',
            user?.theme
          )}`}
        >
          <p>{t('Dark')}</p> <Icon icon='bedtime' styles='text-blue-500 !text-xl' />
        </div>
      </div>
    </div>
  );
}
