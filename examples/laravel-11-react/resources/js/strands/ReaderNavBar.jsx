import { useTranslation } from 'react-i18next';

export default () => {

    const { t } = useTranslation();

    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="mx-auto py-4 px-6 sm:px-6 lg:px-[15%]">
                <div className="flex items-center justify-between space-x-4">
                    <a href="/"
                        className="rounded-md px-3 py-2 border border-black hover:text-white hover:bg-black text-black ring-1 ring-transparent transition">
                        <h2 className="font-semibold text-lg leading-tight">
                            DevDiary
                        </h2>
                    </a>

                    <input type="text" placeholder={`${t('Search')}...`}
                        className="w-full px-4 py-2 rounded-md border-gray-300  dark:text-gray-200 focus:outline-none  transition duration-300" />

                    <div  className="flex items-center space-x-4">

                        <a href="{{ route('login') }}"
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            {t('Login')}
                        </a>
                        <a href="{{ route('register') }}"
                            className="rounded-md whitespace-nowrap font-bold w-auto text-blue-600 px-3 py-2 border border-blue-600 ring-1 ring-transparent transition hover:text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                            {t('Register')}
                        </a>

                    </div>

                </div>
            </div>
        </header>
    )
}