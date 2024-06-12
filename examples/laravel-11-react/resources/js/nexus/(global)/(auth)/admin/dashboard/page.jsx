import Header from '@/components/Header';
import PageContent from '@/components/PageContent';
import { sharedProps } from '@laravext/react'
import { useTranslation } from 'react-i18next';

export default () => {

    const { t } = useTranslation();

    return (
        <>
            <Header>Dashboard (React)</Header>

            <PageContent>
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    {t("You're logged in")}, {sharedProps().auth?.user?.first_name}!
                </div>
            </PageContent>
        </>
    );
};