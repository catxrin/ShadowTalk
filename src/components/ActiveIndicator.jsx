export default function ActiveIndicator(active) {
  return <div className={`w-2 h-2 shadow-sm mt-0.5 rounded-full ${active ? 'bg-green-400' : 'bg-gray-400'}`}></div>;
}
