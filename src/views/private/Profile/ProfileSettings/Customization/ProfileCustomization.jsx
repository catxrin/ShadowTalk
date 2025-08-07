import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';

import { UserContext } from '../../../../../contexts/UserProvider';
import { updateUserProfile } from '../../../../../helpers/actions/user';

import Tags from './Tags';
import Icon from '../../../../../components/Icon';
import Input from '../../../../../components/Forms/Input';
import Textarea from '../../../../../components/Forms/Textarea';
import MediaInput from '../../../../../components/Forms/MediaInput';
import BackgroundImages from './BackgroundImages';
import UpdateIndicator from './UpdateIndicator';

export default function ProfileCustomization() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { user, setUserAuth } = useContext(UserContext);

  const methods = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      description: user?.description,
      tags: user?.tags,
      bgImage: user?.bgImage,
      file: user?.image,
    },
  });

  const submitData = () =>
    methods.handleSubmit(data => {
      updateUserProfile({ ...data, description: data?.description.trim() }, user?._id).then(data => setUserAuth(data));
      methods.reset(methods.getValues());
    });

  return (
    <FormProvider {...methods}>
      <div className='flex flex-col p-3 bg-[#2E2F38] relative min-h-full'>
        <div className='flex flex-row items-center gap-1 w-full'>
          <Icon onClick={() => navigate(`/chat`)} styles='text-white !text-3xl' icon='chevron_left' />
          <p className='font-semibold text-white text-xl'>{t('Profile Customization')}</p>
        </div>
        <form
          onSubmit={submitData()}
          className='sm:min-w-[20rem] sm:justify-between justify-center flex flex-col gap-10 xl:items-start bg-[#2E2F38] sm:p-8 rounded text-white items-center'
        >
          <div className='flex flex-row gap-50 w-full'>
            <div className='flex flex-col gap-3 sm:w-[30rem] w-full p-3'>
              <div className='flex flex-col gap-1'>
                <p className='font-semibold'>{t('Avatar')}</p>
                <MediaInput defaultImage={user?.image} name='file' />
              </div>
              <Input
                name='username'
                label='Username'
                rules={{
                  minLength: { value: 3, message: t('Username must contain at least 3 characters') },
                  validate: {
                    removeWhiteSpace: value => value.trim('') !== '' || t('This field is required.'),
                  },
                }}
              />
              <Input
                name='email'
                label='Email'
                rules={{
                  required: t('This field is required.'),
                  pattern: {
                    value: /[a-zA-Z0-9.-]+(.[a-zA-Z]{2,})+/gm,
                    message: t('Invalid email format.'),
                  },
                  validate: {
                    removeWhiteSpace: value => value.trim('') !== '' || t('This field is required.'),
                  },
                }}
              />
              <Textarea
                name='description'
                label={t('Description')}
                rules={{
                  maxLength: { value: 200, message: t('Total characters reached') },
                }}
              />
            </div>
            <Tags />
          </div>
          <BackgroundImages />
          {methods.formState.isDirty && <UpdateIndicator />}
        </form>
      </div>
    </FormProvider>
  );
}
