import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import { UserContext } from '../../../contexts/UserProvider';
import { updateUserProfile } from '../../../helpers/actions/user';

import Icon from '../../../components/Icon';
import Input from '../../../components/Forms/Input';
import MediaInput from '../../../components/Forms/MediaInput';
import Textarea from '../../../components/Forms/Textarea';

export default function ProfileCustomization() {
  const navigate = useNavigate();
  const { user, setUserAuth } = useContext(UserContext);
  const methods = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      description: user?.description,
      file: user?.image,
      bgImage: user?.bgImage,
    },
  });

  const selectedImage = methods.watch('bgImage');
  const submitData = () =>
    methods.handleSubmit(data => {
      updateUserProfile(data, user?._id).then(data => {
        setUserAuth(data);
      });
    });

  return (
    <FormProvider {...methods}>
      <div className='flex flex-row items-center gap-1'>
        <Icon onClick={() => navigate(`/chat`)} styles='text-white !text-3xl' icon='chevron_left' />
        <p className='font-semibold text-white text-xl'>Profile Customization</p>
      </div>
      <form
        onSubmit={submitData()}
        className='sm:min-w-[20rem] flex flex-row  bg-[#2E2F38] p-8 rounded text-white justify-between'
      >
        <div className='flex flex-col gap-3 w-[30rem]'>
          <div className='flex flex-col gap-1'>
            <p className='font-semibold'>Avatar</p>
            <MediaInput defaultImage={user?.image} name='file' />
          </div>
          <Input
            name='username'
            label='Username'
            rules={{
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must contain at least 3 characters' },
            }}
          />
          <Input
            name='email'
            label='Email'
            rules={{
              required: 'Email is required',
              pattern: {
                value: /[a-zA-Z0-9.-]+(.[a-zA-Z]{2,})+/gm,
                message: 'Invalid email format.',
              },
            }}
          />
          <Textarea name='description' label='Description' />
          <button type='submit' className='text-black w-[30rem] bg-white py-1 cursor-pointer font-semibold rounded'>
            Submit
          </button>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='font-semibold'>Profile Background</p>
          <div className='flex flex-row gap-4 flex-wrap w-[50rem]'>
            <div
              name='bgImage'
              onClick={() => methods.setValue('bgImage', 'uploads/landscape1.jpg')}
              className={`w-76 h-54 bg-[url(/server/uploads/landscape1.jpg)] ${
                selectedImage === 'uploads/landscape1.jpg' && 'border-2 border-white'
              } rounded bg-cover`}
            ></div>
            <div
              name='bgImage'
              onClick={() => methods.setValue('bgImage', 'uploads/landscape2.jpg')}
              className={`w-76 h-54 bg-[url(/server/uploads/landscape2.jpg)] ${
                selectedImage === 'uploads/landscape2.jpg' && 'border-2 border-white'
              } rounded bg-cover`}
            ></div>
            <div
              name='bgImage'
              onClick={() => methods.setValue('bgImage', 'uploads/landscape3.jpg')}
              className={`w-76 h-54 bg-[url(/server/uploads/landscape3.jpg)] ${
                selectedImage === 'uploads/landscape3.jpg' && 'border-2 border-white'
              } rounded bg-cover`}
            ></div>
            <div
              name='bgImage'
              onClick={() => methods.setValue('bgImage', 'uploads/landscape4.jpg')}
              className={`w-76 h-54 bg-[url(/server/uploads/landscape4.jpg)] ${
                selectedImage === 'uploads/landscape4.jpg' && 'border-2 border-white'
              } rounded bg-cover`}
            ></div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
