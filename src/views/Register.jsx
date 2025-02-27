import { FormProvider, useForm } from 'react-hook-form';
import { userRegister } from '../helpers/auth';
import Input from '../components/Forms/Input';

import Shape from '../components/Shape';
import PasswordInput from '../components/Forms/PasswordInput';
import { NavLink } from 'react-router-dom';

export default function Register() {
  const methods = useForm();
  const submitData = () =>
    methods.handleSubmit(({ username, email, password }) => {
      userRegister({ username, email, password });
    });
  return (
    <div className='min-h-screen relative bg-black/95 overflow-hidden gap-4 flex justify-center flex-col items-center text-white'>
      <Shape position='-top-40 -right-20 blur-[100px]' />
      <Shape position='-bottom-40 -left-30 blur-[300px]' />
      <div className='flex h-full flex-col justify-center items-center gap-3'>
        <img className='h-20 w-24' src='logo.png' alt='logo' />
        <div className='flex flex-col gap-1 text-center'>
          <p className='font-semibold text-3xl'>New here? Let’s go!</p>
          <div className='flex flex-row gap-2 justify-center'>
            <p className='text-gray-400'>Already a member?</p>
            <NavLink to='/login' className='text-white hover:underline hover:cursor-pointer'>
              Sign in here
            </NavLink>
          </div>
        </div>
      </div>

      <FormProvider {...methods}>
        <form className='max-w-[24rem] min-w-[20rem] w-full flex flex-col text-white gap-4' onSubmit={submitData()}>
          <Input
            placeholder='Username'
            rules={{
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must contain at least 3 characters' },
            }}
            name='username'
            label='Username'
          />
          <Input
            name='email'
            label='Email'
            placeholder='example@domain.com'
            rules={{
              required: 'Email is required',
              pattern: {
                value: /[a-zA-Z0-9.-]+(.[a-zA-Z]{2,})+/gm,
                message: 'Invalid email format.',
              },
            }}
          />
          <PasswordInput />
          <Input
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            placeholder=' ••••••••'
            rules={{
              required: 'Confirm password is required',
              validate: {
                passwordEqual: value => value === methods.getValues('password') || "Passwords doesn't match!",
              },
            }}
          />
          <button type='submit' className='text-black bg-white py-1 font-semibold rounded'>
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
