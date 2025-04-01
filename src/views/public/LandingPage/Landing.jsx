import Separator from '../../../components/Separator';
import About from './About';
import Home from './Home';
import Contacts from './Contacts';

export default function Landing() {
  return (
    <div className='overflow-hidden min-h-screen flex-col bg-[#0c0c0c] text-white flex justify-center items-center'>
      <Home />
      <Separator />
      <About />
      <Separator />
      <Contacts />
    </div>
  );
}
