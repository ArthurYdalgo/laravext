import Header from '@/components/Header';
import Loading from '@/components/Loading';
import PageContent from '@/components/PageContent';
import { routeParams } from '@laravext/react';
import axios from 'axios';
import { useEffect } from 'react';
import DangerButton from '@/components/DangerButton'
import { debounce } from 'lodash';
import PrimaryButton from '@/components/PrimaryButton';
import Link from '@/components/Link';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import useStateRef from 'react-usestateref';
import usePrivacy from '@/hooks/usePrivacy';
import FormSaveButton from '@/components/FormSaveButton';
import Form from '@/components/Form';
import { AsyncPaginate } from "react-select-async-paginate";

export default () => {
  const { t } = useTranslation();

  const { setActive: setPrivacyActive, active: privacyIsActive, toggle: togglePrivacy } = usePrivacy();

  const [form, setForm, formRef] = useStateRef({
    data: routeParams().developer,
    errors: [],
    submitting: false,
  });


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
          .delete(`/api/developers/${id}`)
          .then(() => {
            Swal.fire(t('Record deleted!'), t('The developer has been deleted.'), 'success').then(() => {
              window.location.href = '/admin/developers';
            });
          })
          .catch(error => {
            console.error(error);
            Swal.fire(t('Error!'), t('An error occurred while deleting the developer.'), 'error');
          });
      }
    });
  };

  const updateResource = () => {
    setForm(prevState => ({ ...prevState, submitting: true }));

    const data = {
      name: form.data.name,
    };


    return axios.put(`/api/developers/${routeParams().team}`, data)
      .then(() => {
        setForm(prevState => ({ ...prevState, submitting: false }));
        Swal.fire(t('Record updated!'), t('The developer has been updated.'), 'success').then(() => {
          window.location.href = route('admin.developers');
        });
      })
      .catch(() => {
        setForm(prevState => ({ ...prevState, submitting: false }));
        Swal.fire(t('Error!'), t('An error occurred while updating the developer.'), 'error');
      });
  };

  return (
    <>
      <Header>{`${t('Edit developer')} #${routeParams().developer.id} - ${form.data.name}`}</Header>
      <div className="mt-3 mx-4 flex justify-end space-x-2">
        <Link href={`/admin/companies/${routeParams().team}`}>
          <PrimaryButton>{t('Show')}</PrimaryButton>
        </Link>
        <DangerButton onClick={() => destroyResource(routeParams().developer.id)} className="hover:text-red-900">{t('Delete')}</DangerButton >
      </div >
      {form.loading ? <Loading /> :
        <PageContent>

          <Form>
            <Form.Field>
              <Form.Label>{t('Name')}</Form.Label>
              <Form.Input type="text" inputProps={{
                value: form.data.name,
                onChange: e => {
                  setForm(prevState => ({ ...prevState, data: { ...prevState.data, name: e.target.value } }))
                }
              }} />
            </Form.Field>

            <Form.Field>
                <Form.Label>{t('Team')}</Form.Label>
                <AsyncPaginate classNamePrefix="border-black remove-input-txt-border" styles={{
                    boxShadow: 'none',
                }} />  
            </Form.Field>

          </Form>

          <FormSaveButton disabled={form.submitting} loading={form.submitting} onClick={updateResource}>{t('Save')}</FormSaveButton>

        </PageContent >
      }
    </>
  );
}