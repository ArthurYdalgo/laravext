import ArticleListing from '@/components/Article/ArticleListing';
import Dropdown from '@/components/Dropdown';
import DropdownButton from '@/components/DropdownButton';
import Fa from '@/components/Fa';
import FollowButton from '@/components/FollowButton';
import ThreeDots from '@/components/Icons/ThreeDots';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { sharedProps, nexusProps } from '@laravext/react'
import { useTranslation } from 'react-i18next'

export default () => {

    const { t } = useTranslation();
    const { user } = sharedProps().auth;

    const { user: pageUser } = nexusProps();

    if (!pageUser) {
        return null;
    }

    return (<>
        {/* color area under top frame */}
        <div className="bg-white rounded-md mt-2 shadow-md">
            {/* user profile */}
            <div className={"flex items-center justify-center rounded-t-md"} style={{ backgroundColor: pageUser?.banner_hex_color ?? '#000000' }}>

                <div className='p-4 py-6'>
                    <img className="h-32 w-32 rounded-full border-gray-200 border-2" src={pageUser?.avatar_url ?? "/images/avatars/placeholder.png"} alt={pageUser?.name} />
                </div>
            </div>
            <div className="flex items-center justify-center p-1">
                <div className='flex flex-col items-center space-y-2'>
                    <span className="font-extrabold text-3xl">{pageUser?.name}</span>
                    {pageUser?.id != user?.id && (<div className='flex'>
                        <FollowButton followee={pageUser} />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <SecondaryButton className="ml-2 border-0 shadow-none">
                                    <ThreeDots />
                                </SecondaryButton>
                            </Dropdown.Trigger>

                            <Dropdown.Content align="right">

                                <DropdownButton

                                    onClick={() => {

                                    }}
                                >
                                    <span className="">
                                        Report Abuse
                                    </span>
                                </DropdownButton>

                            </Dropdown.Content>
                        </Dropdown>
                    </div>)}

                    <div className="text-center text-base mt-2 px-6">
                        {pageUser.biography}
                    </div>
                </div>
            </div>

        </div>
        <div className="flex mt-3 space-x-3">
            <div className="hidden sm:block sm:w-4/12 lg:w-4/12 space-y-3">
                {pageUser.skills?.length > 0 && (<div className='bg-white rounded-md shadow-md '>
                    <span className='block py-1 pl-4 text-lg font-bold'>
                        {t('Skills')}
                    </span>
                    <div className='border-b border-gray-200'></div>
                    <div className='space-y-1 p-1'>
                        {pageUser.skills.map((skill, index) => (
                            <span key={`skill-${index}`} className='block'>
                                {skill}
                            </span>
                        ))}
                    </div>

                </div>)}
                <div className='bg-white rounded-md shadow-md space-y-2 py-2'>
                    <span className='block pl-4 font-medium text-sm'>
                        <Fa icon='newspaper' /> {pageUser.articles_count} {t('articles(s) published')}
                    </span>
                    <span className='block pl-4 font-medium text-sm'>
                        <Fa icon='comment' /> {pageUser.comments_count} {t('comment(s) written')}
                    </span>
                    <span className='block pl-4 font-medium text-sm'>
                        <Fa icon='hashtag' /> {pageUser.tags_count} {t('tag(s) followed')}
                    </span>
                </div>
            </div>

            <div className="sm:w-8/12 lg:w-8/12">
                <ArticleListing queryParams={{
                    filter: {
                        user_id: pageUser.id
                    }
                }} />
            </div>
        </div>
    </>);
};
