import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className='grid h-screen place-items-center bg-gray-900 text-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-3xl font-semibold text-purple-600'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>Page not found</h1>
        <p className='mt-6 text-base leading-7'>Sorry, we couldn’t find the page you’re looking for.</p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link
            to='/chat'
            className='rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500'
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
