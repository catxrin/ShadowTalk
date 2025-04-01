import { FormProvider, useForm } from 'react-hook-form';
import { userRegister } from '../../helpers/auth';
import Logo from '../../components/Logo';
import Input from '../../components/Forms/Input';

import Shape from '../../components/Shape';
import PasswordInput from '../../components/Forms/PasswordInput';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register() {
  const methods = useForm();
  const navigate = useNavigate();

  const submitData = () =>
    methods.handleSubmit(({ username, email, password }) => {
      userRegister({ username: username.trim(), email: email.trim(), password: password.trim() }).then(() =>
        navigate('/chat')
      );
    });

  return (
    <div className='min-h-screen relative bg-[#0c0c0c] overflow-hidden gap-4 flex justify-center flex-col items-center text-white'>
      <Shape position='-top-40 -right-20 blur-[100px] xl:max-h-full xl:max-w-full max-h-40 max-w-40' />
      <Shape position='xl:-bottom-40 xl:-left-32 -bottom-20 -left-52 blur-[100px] xl:max-h-full xl:max-w-full max-h-40 max-w-40' />
      <div className='flex h-full flex-col justify-center items-center gap-3'>
        <Logo />
        <div className='flex flex-col gap-1 text-center'>
          <p className='font-semibold text-xl xl:text-3xl'>New here? Let’s go!</p>
          <div className='flex flex-row gap-2 justify-center'>
            <p className='text-gray-400 xl:text-base text-sm'>Already a member?</p>
            <NavLink to='/login' className='text-white xl:text-base text-sm hover:underline hover:cursor-pointer'>
              Sign in here
            </NavLink>
          </div>
        </div>
      </div>

      <FormProvider {...methods}>
        <form
          className='xl:max-w-[24rem] max-w-40 min-w-[20rem] xl:w-full flex flex-col text-white gap-4'
          onSubmit={submitData()}
        >
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
