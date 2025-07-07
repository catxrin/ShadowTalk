import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';

import { UserContext } from '../../../../contexts/UserProvider';
import { updateUserProfile } from '../../../../helpers/actions/user';

import Tags from './Tags';
import Icon from '../../../../components/Icon';
import Input from '../../../../components/Forms/Input';
import MediaInput from '../../../../components/Forms/MediaInput';
import Textarea from '../../../../components/Forms/Textarea';

export default function ProfileCustomization() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { user, setUserAuth } = useContext(UserContext);

  const chooseImage = image => methods.setValue('bgImage', `uploads/${image}`);
  const resetForm = () => methods.reset();

  const methods = useForm({
    defaultValues: {
      username: user?.username,
      tags: user?.tags,
      email: user?.email,
      description: user?.description,
      file: user?.image,
      bgImage: user?.bgImage,
    },
  });

  const submitData = () =>
    methods.handleSubmit(data => {
      updateUserProfile({ ...data, description: data?.description.trim() }, user?._id).then(data => {
        setUserAuth(data);
      });
    });

  const selectedImage = methods.watch('bgImage');

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
                label={t('Username')}
                rules={{
                  minLength: { value: 3, message: t('Username must contain at least 3 characters') },
                  validate: {
                    removeWhiteSpace: value => value.trim('') !== '' || t('This field is required.'),
                  },
                }}
              />
              <Input
                name='email'
                label={t('Email')}
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
                rules={{
                  maxLength: { value: 200, message: t('Total characters reached') },
                }}
                name='description'
                label={t('Description')}
              />
            </div>
            <Tags />
          </div>
          <div className='flex flex-col gap-1 justify-start'>
            <p className='font-semibold'>{t('Profile Background')}</p>
            <div className='flex flex-row gap-4 flex-wrap justify-center'>
              <div
                name='bgImage'
                onClick={() => chooseImage('landscape1.jpg')}
                className={`w-60 h-40 sm:w-70 sm:h-48 bg-[url(/server/uploads/landscape1.jpg)] ${
                  selectedImage === 'uploads/landscape1.jpg' && 'border-2 border-white'
                } rounded bg-cover`}
              />
              <div
                name='bgImage'
                onClick={() => chooseImage('landscape2.jpg')}
                className={`w-60 h-40 sm:w-70 sm:h-48 bg-[url(/server/uploads/landscape2.jpg)] ${
                  selectedImage === 'uploads/landscape2.jpg' && 'border-2 border-white'
                } rounded bg-cover`}
              />
              <div
                name='bgImage'
                onClick={() => chooseImage('landscape3.jpg')}
                className={`w-60 h-40 sm:w-70 sm:h-48 bg-[url(/server/uploads/landscape3.jpg)] ${
                  selectedImage === 'uploads/landscape3.jpg' && 'border-2 border-white'
                } rounded bg-cover`}
              />
              <div
                name='bgImage'
                onClick={() => chooseImage('landscape4.jpg')}
                className={`w-60 h-40 sm:w-70 sm:h-48 bg-[url(/server/uploads/landscape4.jpg)] ${
                  selectedImage === 'uploads/landscape4.jpg' && 'border-2 border-white'
                } rounded bg-cover`}
              />
            </div>
          </div>
          {methods.formState.isDirty && (
            <div className='flex left-0 right-0 m-auto text-sm font-semibold flex-row justify-between items-center shadow-sm w-5/10 bg-[#40414e] rounded px-4 py-3 absolute bottom-10'>
              <p>You have unsaved changes!</p>
              <div className='flex flex-row gap-3 text-sm font-semibold'>
                <button
                  onClick={resetForm}
                  className='px-2.5 cursor-pointer py-1 text-white border-white/15 border shadow-sm rounded'
                >
                  Reset
                </button>
                <button type='submit' className='px-2.5 cursor-pointer py-1 text-white bg-indigo-500 shadow-sm rounded'>
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </FormProvider>
  );
}
