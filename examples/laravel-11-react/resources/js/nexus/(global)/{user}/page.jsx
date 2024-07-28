import Dropdown from '@/components/Dropdown';
import DropdownButton from '@/components/DropdownButton';
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

    if(!pageUser) {
        return null;
    }

    return (<>
        {/* color area under top frame */}
        <div className="bg-white rounded-md mt-2 shadow-md">
            {/* user profile */}
            <div className={"flex items-center justify-center rounded-t-md"} style={{backgroundColor: pageUser?.banner_hex_color ?? '#000000'}}>
                
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
                                    
                                    onClick={() =>{

                                    }}
                                >
                                    <span className="">
                                        Report Abuse
                                    </span>
                                </DropdownButton>
                                
                            </Dropdown.Content>
                        </Dropdown>
                    </div>)}
                    
                    <div className="text-center text-base mt-2">
                        {pageUser.biography}
                    </div>
                </div>
            </div>

        </div>
    </>);
};
