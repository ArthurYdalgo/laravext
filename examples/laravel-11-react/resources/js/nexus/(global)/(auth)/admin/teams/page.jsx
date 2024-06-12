import React, {  useEffect } from 'react';
import useState from "react-usestateref";
import Pagination from '@/components/Pagination';
import PrimaryButton from '@/components/PrimaryButton';
import { debounce } from 'lodash';
import DangerButton from '@/components/DangerButton';
import Header from '@/components/Header';
import Link from '@/components/Link';
import SecondaryButton from '@/components/SecondaryButton';
import PageContent from '@/components/PageContent';
import Loading from '@/components/Loading';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';

const Teams = () => {
    const { t } = useTranslation();
    const [pagination, setPagination, paginationRef] = useState({
        data: [],
        meta: {},
        loading: true,
        page: 1,
        per_page: 10,
    });

    const [filters, setFilters, filtersRef] = useState({
        search: '',
    });

    const fetchResources = () => {
        setPagination(prevState => ({ ...prevState, loading: true }));

        axios
            .get('/api/teams', {
                params: {
                    page: paginationRef.current.page,
                    per_page: paginationRef.current.per_page,
                    search: filtersRef.current.search ?? '',
                },
            })
            .then(response => {
                setPagination(prevState => ({
                    ...prevState,
                    data: response.data.data,
                    meta: response.data.meta,
                    loading: false,
                }));
            })
            .catch(error => {
                console.error(error);
                setPagination(prevState => ({ ...prevState, loading: false }));
            });
    }

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
                    .delete(`/api/teams/${id}`)
                    .then(() => {
                        fetchResources();
                        Swal.fire(t('Record deleted!'), t('The team has been deleted.'), 'success');
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire(t('Error!'), t('An error occurred while deleting the team.'), 'error');
                    });
            }
        });
    };

    const debouncedFetchResources = debounce(() => {
        pagination.page = 1;
    
        fetchResources();
    }, 1000);

    useEffect(() => {
        fetchResources();
    }, []);

    const paginateTo = ({ page, perPage }) => {
        setPagination(prevState => ({
            ...prevState,
            page,
            per_page: perPage,
        }));
        fetchResources();
    };

    return (
        <>
            <Header>{t('Teams')}</Header>

            <div className="mt-3 mx-4 flex justify-end space-x-2">
                <Link href="/admin/teams/create">
                    <PrimaryButton>{t('Create')}</PrimaryButton>
                </Link>
            </div>

            <PageContent>

                <Loading condition={pagination.loading} />

                <>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                id="search"
                                value={filters.search}
                                onChange={(e) => {
                                    setFilters({ ...filters, search: e.target.value });
                                    console.log({event: e.target.value})
                                    debouncedFetchResources();
                                }}
                                placeholder={t('Search')}
                                className="border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <table className={`min-w-full divide-y divide-gray-200 border my-4 ${pagination.loading ? 'opacity-50' : ''}`}>
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    {t('Name')}
                                </th>
                                <th className="border-l w-96 px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    {t('Actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagination.data.map(resource => (
                                <tr
                                    key={resource.id}
                                    className="odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700"
                                >
                                    <td className="border-t px-6 py-4 whitespace-no-wrap text-sm text-gray-900 w-28">
                                        <div className="text-sm leading-5 font-medium text-gray-900">{resource.id}</div>
                                    </td>
                                    <td className="border-t border-l px-6 py-4 whitespace-no-wrap">
                                        <div className="text-sm leading-5 text-gray-900">{resource.name}</div>
                                    </td>
                                    <td className="border-t border-l px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium space-x-2">
                                        <Link href={`/admin/teams/${resource.id}`}>
                                            <PrimaryButton>{t('Show')}</PrimaryButton>
                                        </Link>
                                        <Link href={`/admin/teams/${resource.id}/edit`}>
                                            <SecondaryButton>{t('Edit')}</SecondaryButton>
                                        </Link>
                                        <DangerButton onClick={() => destroyResource(resource.id)} className="hover:text-red-900">
                                            {t('Delete')}
                                        </DangerButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!pagination.loading && <Pagination onPaginateTo={paginateTo} pagination={pagination} />}
                </>

            </PageContent>
        </>
    );
};

export default Teams;
