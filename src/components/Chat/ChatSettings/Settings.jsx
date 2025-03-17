import Modal from '../../Modal';
import Option from './Option';

export default function Settings({ setShow }) {
  return (
    <Modal setShow={setShow} label='Chat Settings'>
      <Option
        icon='block'
        label='Block user'
        description='By clicking here you will lose your chat with this user forever. The user can still be found, however, the
            chat will be gone'
      />
      <div className='min-w-full h-[1px] bg-gray-500'></div>
      <Option
        icon='delete'
        label='Delete chat'
        description='By clicking here sending or receiving messages from this user will be forbidden unless you unblock the user'
      />
    </Modal>
  );
}
