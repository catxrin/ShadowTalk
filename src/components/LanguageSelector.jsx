import i18next from 'i18next';

export default function LanguageSelector() {
  const changeLanguage = lng => i18next.changeLanguage(lng);
  const activeLanguageStyles = lng => (i18next.language === lng ? 'bg-secondary shadow-sm text-normal' : 'text-muted');

  return (
    <div className='flex flex-row items-start shadow-sm self-start bg-primary/50 rounded'>
      <div
        className={`${activeLanguageStyles(
          'bg'
        )} transition duration-500 ease-in-out font-semibold flex items-center py-1 px-3 rounded cursor-pointer`}
        onClick={() => changeLanguage('bg')}
      >
        BG
      </div>
      <div
        className={`${activeLanguageStyles(
          'en'
        )} transition duration-500 ease-in-out font-semibold flex items-center py-1 px-3 rounded cursor-pointer`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </div>
    </div>
  );
}
