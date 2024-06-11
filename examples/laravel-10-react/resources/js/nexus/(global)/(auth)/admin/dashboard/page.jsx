import Header from '@/components/Header';
import PageContent from '@/components/PageContent';
import { sharedProps } from '@laravext/react'

export default () => {
    
    return (
        <>
            <Header>Dashboard</Header>

            <PageContent>
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    {`You're logged in, ${sharedProps().auth?.user?.first_name}!`}
                </div>
            </PageContent>
        </>
    );
};