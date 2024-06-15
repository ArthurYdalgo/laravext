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
import FormSaveButton from '@/components/FormSaveButton';
import Form from '@/components/Form';

export default () => {
    const { t } = useTranslation();

    const { setActive: setPrivacyActive, active: privacyIsActive, toggle: togglePrivacy } = usePrivacy();

    const [form, setForm, formRef] = useStateRef({
        data: {},
        errors: [],
        loading: true,
        submitting: false,
    });

    useEffect(() => {
        axios.get(`/api/companies/${routeParams().company}`)
            .then(response => {
                setForm(prevState => ({
                    ...prevState, data: response.data, loading: false
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

    const updateResource = () => {
        setForm(prevState => ({ ...prevState, submitting: true }));

        const data = {
            name: form.data.name,
            email: form.data.email,
            website: form.data.website,
        };

        return axios.put(`/api/companies/${routeParams().company}`, data)
            .then(() => {
                setForm(prevState => ({ ...prevState, submitting: false }));
                Swal.fire(t('Record updated!'), t('The company has been updated.'), 'success').then(() => {
                    window.location.href = route('admin.companies');
                });
            })
            .catch(() => {
                setForm(prevState => ({ ...prevState, submitting: false }));
                Swal.fire(t('Error!'), t('An error occurred while updating the company.'), 'error');
            });
    };

    return (
        <>
            <Header>{ form.submitting ? t('Loading...') : `${t('Edit company')} #${routeParams().company} - ${form.data.name}` }</Header>
            <div className="mt-3 mx-4 flex justify-end space-x-2">
                <Link href={`/admin/companies/${routeParams().company}`}>
                    <PrimaryButton>{t('Show')}</PrimaryButton>
                </Link>
                <DangerButton onClick={() => destroyResource(routeParams().company)} className="hover:text-red-900">{t('Delete')}</DangerButton >
            </div >
            {form.loading ? <Loading /> :
                <PageContent>

                    <Form>
                        <Form.Field>
                            <Form.Label>{t('Name')}</Form.Label>
                            <Form.Input type="text" inputProps={{
                                value: form.data.name,
                                onChange: e => {
                                    console.log(e.target.value)
                                    setForm(prevState => ({ ...prevState, data: { ...prevState.data, name: e.target.value } }))
                                }
                            }} />
                        </Form.Field>

                        <Form.Field>
                            <Form.Label>{t('Email')}</Form.Label>
                            <Form.Input type="email"
                                inputProps={{
                                    value: form.data.email,
                                    onChange: e => {
                                        console.log(e.target.value)
                                        setForm(prevState => ({ ...prevState, data: { ...prevState.data, email: e.target.value } }))
                                    }
                                }}
                            />
                        </Form.Field>

                        <Form.Field>
                            <Form.Label>{t('Website')}</Form.Label>
                            <Form.Input type="text" value={form.data.website} inputProps={
                                {
                                    value: form.data.website,
                                    onChange: e => {
                                        console.log(e.target.value)
                                        setForm(prevState => ({ ...prevState, data: { ...prevState.data, website: e.target.value } }))
                                    }
                                }
                            } />
                        </Form.Field>
                    </Form>

                    <FormSaveButton disabled={form.submitting} loading={form.submitting} onClick={updateResource}>{t('Save')}</FormSaveButton>

                </PageContent>
            }
        </>
    );
}