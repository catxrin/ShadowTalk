import Shape from '../components/Shape';

export default function Home() {
  return (
    <section
      id='home'
      className='w-full flex p-6 flex-row justify-center items-center gap-20 overflow-hidden relative xl:min-h-[99vh] min-h-[92vh]'
    >
      <Shape position='-top-40 -right-20 blur-[100px] xl:max-h-full xl:max-w-full max-h-40 max-w-40' />
      <Shape position='xl:-bottom-40 xl:-left-32 -bottom-20 -left-52 blur-[100px] xl:max-h-full xl:max-w-full max-h-40 max-w-40' />

      <div className='xl:max-w-[40rem] max-w-92 flex flex-col gap-6'>
        <div className='flex flex-row justify-center xl:gap-5 gap-3'>
          <div className='flex flex-row gap-2'>
            <div className='xl:p-1 p-0.5 max-h-20 bg-gradient-to-b from-white to-gray-300 rounded-full'></div>
            <div className='xl:p-1 p-0.5  bg-gradient-to-b from-gray-400 to-gray-600 max-h-36 rounded-full'></div>
            <div className='xl:p-1 p-0.5 bg-gradient-to-b from-gray-500 to-gray-700 max-h-48 rounded-full'></div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col font-[nuosu] xl:gap-5 gap-3'>
              <div className='flex flex-col'>
                <h1 className='xl:text-7xl text-3xl'>Shadow Talk</h1>
                <div className='xl:p-0.5 p-[1px] bg-gradient-to-r from-gray-200 to-gray-700 rounded-full'></div>
              </div>
              <p className=' bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent italic xl:text-xl text-base'>
                A sleek, modern chat app for effortless conversations in a beautifully dark-themed, clutter-free
                interface. Stay connected with friends and groups in style.
              </p>
            </div>
            <button className='rounded-3xl hover:bg-black/10 cursor-pointer transition duration-700 hover:border-[1px] hover:text-white flex flex-row justify-center items-center gap-2 xl:text-base text-sm bg-white font-semibold border text-black border-white px-3 xl:py-1.5 py-1'>
              Start Chatting
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
