import {sharedProps} from '@laravext/react';
import {visit} from '@laravext/react/router';
import SecondaryButton from './SecondaryButton';
import LoadingButton from './LoadingButton';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

export default ({ followee , disabled = false}) => {

    const { t } = useTranslation();

    if(!followee) {
        return null;
    }

    const { user } = sharedProps().auth;

    const [followingStatus, setFollowingStatus] = useState({
        loading: true,
        value: false,
        started_at: null,
        ended_at: null,
    });

    const getFollwingStatus = () => {
        axios.get(`/api/tools/users/${user.id}/is-following/${followee.id}`)
            .then(response => {
                const {data} = response.data;
                setFollowingStatus({
                    loading: false,
                    value: data.value,
                    started_at: data ? data.started_at : null,
                    ended_at: data ? data.ended_at : null,
                });
            });
    }

    useEffect(() => {
        if (user) {
            getFollwingStatus();
        }else{
            setFollowingStatus({
                loading: false,
                value: false,
                started_at: null,
                ended_at: null,
            });
        }
    }, [followee]);

    const follow = async () => {
        if(!user){
            Swal.fire({
                title: t('You must be logged in to follow someone'),
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: t('Login'),
                cancelButtonText: t('Cancel')
            }).then(({ isConfirmed }) => {
                if (isConfirmed) {
                    visit(route('login'));
                }
            });

            return;
        }

        setFollowingStatus({... followingStatus, value: true});

        axios.put(`/api/tools/users/follow/${followee.id}`)
        .then(response => {
            getFollwingStatus();
        });

    }

    const unfollow = async () => {
        if(!user){
            Swal.fire({
                title: t('You must be logged in to unfollow someone'),
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: t('Login'),
                cancelButtonText: t('Cancel')
            }).then(({ isConfirmed }) => {
                if (isConfirmed) {
                    visit(route('login'));
                }
            });

            return;
        }

        setFollowingStatus({... followingStatus, value: false});
        axios.put(`/api/tools/users/unfollow/${followee.id}`)
            .then(response => {
                getFollwingStatus();
            });

    }

    return (
        <SecondaryButton className="flex items-center justify-center" 
        disabled={disabled} onClick={() => {
            followingStatus.value ? unfollow() : follow();
        }}>
            {followingStatus.loading && <div className="mini-loader mr-3 ml-[-5px]"></div>}
            {!followingStatus.loading && (followingStatus.value && user ? 'Unfollow' : 'Follow')}
        </SecondaryButton>

    )
}