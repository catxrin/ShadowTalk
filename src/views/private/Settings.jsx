import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Input from '../../components/Forms/Input';
import { UserContext } from '../../UserProvider';
import MediaInput from '../../components/Forms/MediaInput';
import Modal from '../../components/Modal';

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
    <Modal setShow={setShow} label='Settings'>
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
    </Modal>
  );
}
