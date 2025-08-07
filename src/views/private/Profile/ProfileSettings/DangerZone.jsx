import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { logout } from '../../../../helpers/actions/auth';
import { UserContext } from '../../../../contexts/UserProvider';

import Icon from '../../../../components/Icon';
import Option from '../../Chat/ChatSettings/Option';

export default function DangerZone() {
  const { setUserAuth } = useContext(UserContext);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const logoutUser = () => {
    logout().then(() => {
      setUserAuth(null);
      navigate('/');
    });
  };

  return (
    <div className='p-3'>
      <div className='flex flex-row items-center gap-2'>
        <Icon onClick={() => navigate(`/chat`)} styles='text-white !text-3xl' icon='chevron_left' />
        <p className='font-semibold text-white text-xl'>{t('Danger Zone')}</p>
      </div>
      <Option onClick={logoutUser} icon='logout' label={t('Logout')} description={t('Logout from your account')} />
    </div>
  );
}
