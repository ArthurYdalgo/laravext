import Header from '@/components/Header';
import Loading from '@/components/Loading';
import PageContent from '@/components/PageContent';
import { routeParams } from '@laravext/react';
import axios from 'axios';
import { useEffect } from 'react';
import DangerButton from '@/components/DangerButton'
import PrimaryButton from '@/components/PrimaryButton';
import Link from '@/components/Link';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import useStateRef from 'react-usestateref';
import usePrivacy from '@/hooks/usePrivacy';

export default () => {
    const { t } = useTranslation();

    const { setActive: setPrivacyActive, active: privacyIsActive, toggle: togglePrivacy } = usePrivacy();

    const [company, setCompany, companyRef] = useStateRef({
        data: {},
        loading: true,
    });

    useEffect(() => {
        axios.get(`/api/companies/${routeParams().company}`)
            .then(response => {
                setCompany(prevState => ({
                    ...prevState, data: {
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        website: response.data.website,
                    }, loading: false
                }));
            });
    }, []);


    const destroyResource = id => {
        Swal.fire({
            title: t('Are you sure?'),
            icon: 'warning',
            confirmButtonText: t('Yes, delete it!'),
            cancelButtonText: t('No, cancel!'),
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            showCancelButton: true,
            showCloseButton: true,
        }).then(result => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/companies/${id}`)
                    .then(() => {
                        Swal.fire(t('Record deleted!'), t('The company has been deleted.'), 'success').then(() => {
                            window.location.href = '/admin/companies';
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire(t('Error!'), t('An error occurred while deleting the company.'), 'error');
                    });
            }
        });
    };

    return (
        <>
            <Header>{company.loading ? t('Loading...') : `#${company.data.id} - ${company.data.name}`}</Header>
            <div className="mt-3 mx-4 flex justify-end space-x-2">
                <Link href={`/admin/companies/${routeParams().company}/edit`}>
                    <PrimaryButton>{t('Edit')}</PrimaryButton>
                </Link>
                <DangerButton onClick={() => destroyResource(routeParams().company)} className="hover:text-red-900">{t('Delete')}</DangerButton >
            </div >
            {company.loading ? <Loading /> :
                <PageContent>
                    <Link href={`/admin/companies/${routeParams().company}/projects`} className="text-blue-600 text-xl font-bold">{t('Click to view projects of Company')} #{routeParams().company}</Link>
                    <br />
                    <span className="text-lg font-bold">{t('Name')}: </span>{company.data.name}
                    <br />
                    <span className="text-lg font-bold">Email: </span>{privacyIsActive ? '***@***' : company.data.email}
                    <br />
                    <span className="text-lg font-bold">Website: </span>

                    {company.data.website && <Link href={company.data.website} className="text-blue-600">{company.data.website}</Link>}
                    {!company.data.website && <span className="text-gray-400">{t('No website')}</span>}
                </PageContent>
            }
        </>
    );
}