import Fa from '@/components/Fa';
import Link from '@/components/Link';
import { useTranslation } from 'react-i18next';
import useStateRef from 'react-usestateref';


export default () => {

    const { t } = useTranslation();
    const [search, setSearch, searchRef] = useStateRef('');
    
    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="mx-auto py-[7px] px-6 sm:px-6 lg:px-[15%]">
                <div className="flex items-center justify-between space-x-4">
                    <a href="/"
                        className=" rounded-[4px] px-3 py-1.5 border border-black hover:text-white hover:bg-black text-black ring-1 ring-transparent transition">
                        <h2 className="font-semibold whitespace-nowrap text-lg leading-tight">
                            Dev Diary
                        </h2>
                    </a>

                    <div className="relative w-full">
                        <Link href={route('search', {q: searchRef.current})} className="absolute p-0.5 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                            <Fa icon="search" className='m-2 ml-3' size='lg' />
                        </Link>
                        <input
                            type="text"
                            placeholder={`${t('Search')}...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:pr-36 pl-10 py-1.5 rounded-md border border-gray-300 transition duration-300 focus:outline-none"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-xs md:block hidden">
                            Powered by Meilisearch
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">

                        <Link routeName="login"
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            {t('Login')}
                        </Link>
                        <Link routeName="register"
                            className="rounded-md whitespace-nowrap font-bold w-auto text-blue-600 px-3 py-2 border border-blue-600 ring-1 ring-transparent transition hover:text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            {t('Register')}
                        </Link>

                    </div>

                </div>
            </div>
        </header>
    )
}