import i18next from 'i18next';

export default function LanguageSelector() {
  const changeLanguage = lng => i18next.changeLanguage(lng);
  const activeLanguageStyles = lng => (i18next.language === lng ? 'bg-white/10 text-gray-200' : 'text-gray-400');

  return (
    <div className='flex flex-row items-start shadow-sm self-start bg-black/50 rounded'>
      <div
        className={`${activeLanguageStyles('bg')} font-semibold flex items-center py-1 px-3 rounded cursor-pointer`}
        onClick={() => changeLanguage('bg')}
      >
        BG
      </div>
      <div
        className={`${activeLanguageStyles('en')} font-semibold flex items-center py-1 px-3 rounded cursor-pointer`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </div>
    </div>
  );
}
