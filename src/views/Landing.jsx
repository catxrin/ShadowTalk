import Separator from '../components/Separator';
import About from './About';
import Home from './Home';

export default function Landing() {
  return (
    <div className='min-w-screen overflow-hidden min-h-screen flex-col bg-[#0c0c0c] text-white flex justify-center items-center'>
      <Home />
      <Separator />
      <About />
      <Separator />
    </div>
  );
}
