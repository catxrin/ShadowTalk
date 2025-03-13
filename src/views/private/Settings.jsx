import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Icon from '../../components/Icon';
import Input from '../../components/Forms/Input';
import { UserContext } from '../../UserProvider';
import MediaInput from '../../components/Forms/MediaInput';

export default function Settings({ setShow }) {
  const { user, setUserAuth } = useContext(UserContext);

  const methods = useForm({ defaultValues: { username: user?.username, email: user?.email, file: user?.image } });

  const submitData = () =>
    methods.handleSubmit(data => {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('username', data.username);
      formData.append('email', data.email);
      fetch('/server/user/' + user?._id, {
        method: 'PATCH',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          setUserAuth(data);
          setShow(false);
        });
    });

  return (
    <div
      onClick={() => setShow(false)}
      className='bg-black/50 absolute backdrop-blur-sm w-screen h-screen flex justify-center items-center'
    >
      <div
        onClick={e => e.stopPropagation()}
        className='bg-[#2E2F38] sm:w-[30rem] sm:h-auto w-screen h-screen rounded text-white sm:px-8 px-4 pt-6 pb-12 flex flex-col gap-4'
      >
        <div className='flex flex-row w-full justify-between'>
          <h1 className='text-xl font-semibold'>Settings</h1>
          <Icon icon='close' onClick={() => setShow(false)} styles='bg-white/10 rounded-full px-2 py-0.5 !text-lg' />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={submitData()} className='w-full sm:min-w-[20rem] flex flex-col text-white gap-4'>
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
            <button type='submit' className='text-black bg-white py-1 font-semibold rounded'>
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
