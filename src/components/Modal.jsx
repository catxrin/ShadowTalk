import Icon from './Icon';

export default function Modal({ children, setShow, label, styles }) {
  return (
    <div
      onClick={() => setShow(false)}
      className='bg-black/50 absolute z-50 left-0 top-0 backdrop-blur-sm w-full h-full flex justify-center items-center'
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`${styles} bg-[#2E2F38] sm:w-[30rem] sm:h-auto w-screen h-screen rounded text-white sm:px-8 px-4 pt-6 pb-12 flex flex-col gap-2`}
      >
        <div className='flex flex-row w-full justify-between'>
          <h1 className='text-xl font-semibold'>{label}</h1>
          <Icon
            icon='close'
            onClick={() => setShow(false)}
            styles='bg-white/10 rounded-full px-1.5 leading-none !text-lg'
          />
        </div>
        {children}
      </div>
    </div>
  );
}
