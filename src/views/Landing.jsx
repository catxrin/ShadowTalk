import Home from './Home';

export default function Landing() {
  return (
    <div className='min-w-screen overflow-hidden min-h-screen flex-col bg-[#0c0c0c] text-white flex justify-center items-center'>
      <Home />
      <div className='xl:p-0.5 p-[1px] w-full bg-gradient-to-r from-gray-200 to-gray-700 rounded-full'></div>
    </div>
  );
}
