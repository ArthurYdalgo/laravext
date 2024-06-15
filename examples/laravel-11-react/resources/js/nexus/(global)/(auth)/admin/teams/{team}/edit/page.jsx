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
import Fa from '@/components/Fa';
import Modal from '@/components/Modal';
import TextInput from '@/components/TextInput';
import Tooltip from '@/components/Tooltip';

export default () => {
  const { t } = useTranslation();

  const { setActive: setPrivacyActive, active: privacyIsActive, toggle: togglePrivacy } = usePrivacy();

  const [form, setForm, formRef] = useStateRef({
    data: {
      name: '',
      developers: [],
    },
    errors: [],
    loading: true,
    submitting: false,
  });

  useEffect(() => {
    axios.get(`/api/teams/${routeParams().team}`)
      .then(response => {
        setForm(prevState => ({
          ...prevState, data: response.data, loading: false
        }));

        console.log(formRef.current.data)
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
          .delete(`/api/teams/${id}`)
          .then(() => {
            Swal.fire(t('Record deleted!'), t('The team has been deleted.'), 'success').then(() => {
              window.location.href = '/admin/teams';
            });
          })
          .catch(error => {
            console.error(error);
            Swal.fire(t('Error!'), t('An error occurred while deleting the team.'), 'error');
          });
      }
    });
  };

  const handleRemoveDeveloperFromTeam = (developer) => {
    setForm(prevState => ({ ...prevState, data: { ...prevState.data, developers: prevState.data.developers.filter(d => d.id !== developer.id) } }));
  };

  const updateResource = () => {
    setForm(prevState => ({ ...prevState, submitting: true }));

    const data = {
      name: form.data.name,
      email: form.data.email,
      website: form.data.website,
    };

    return axios.put(`/api/teams/${routeParams().company}`, data)
      .then(() => {
        setForm(prevState => ({ ...prevState, submitting: false }));
        Swal.fire(t('Record updated!'), t('The team has been updated.'), 'success').then(() => {
          window.location.href = route('admin.teams');
        });
      })
      .catch(() => {
        setForm(prevState => ({ ...prevState, submitting: false }));
        Swal.fire(t('Error!'), t('An error occurred while updating the team.'), 'error');
      });
  };

  const [addDeveloperToTeamModal, setAddDeveloperToTeamModal, addDeveloperToTeamModalRef] = useStateRef({
    visible: true,
    loading: false,
    search: '',
    developers: []
  });

  const fetchDevelopers = () => {
    setAddDeveloperToTeamModal(prevState => ({ ...prevState, loading: true }));

    axios.get('/api/developers', {
      params: {
        per_page: 9,
        search: addDeveloperToTeamModalRef.current.search,
        filter: {
          not_team_ids: [routeParams().team].join(','),
          not_ids: formRef.current.data.developers.map(developer => developer.id).join(','),
        },
      },
    })
      .then(response => {
        setAddDeveloperToTeamModal(prevState => ({ ...prevState, developers: response.data.data, loading: false }));
      })
      .catch(error => {
        console.error(error);
        setAddDeveloperToTeamModal(prevState => ({ ...prevState, loading: false }));
      });
  };


  const debouncedSearchDevelopers = debounce(() => {
    if (addDeveloperToTeamModalRef.current.search?.length == 0) {
      setAddDeveloperToTeamModal(prevState => ({ ...prevState, developers: [] }));
      return;
    }

    fetchDevelopers();
  }, 1000);

  // Close the add developer modal and reset its state
  const closeAddDeveloperToTeamModal = () => {
    setAddDeveloperToTeamModal({
      ...addDeveloperToTeamModal,
      visible: false,
      search: '',
      developers: []
    });
  };

  return (
    <>
      <Header>{form.submitting ? t('Loading...') : `${t('Edit team')} #${routeParams().team} - ${form.data.name}`}</Header>
      <div className="mt-3 mx-4 flex justify-end space-x-2">
        <Link href={`/admin/companies/${routeParams().team}`}>
          <PrimaryButton>{t('Show')}</PrimaryButton>
        </Link>
        <DangerButton onClick={() => destroyResource(routeParams().team)} className="hover:text-red-900">{t('Delete')}</DangerButton >
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



          </Form>
          <span className="text-lg font-bold">{t('Developers')}: <PrimaryButton
            onClick={() => {
              setAddDeveloperToTeamModal(prevState => ({ ...prevState, visible: true }));
            }} className="bg-green-600" type="button">
            <Fa icon="plus" /></PrimaryButton> </span>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {form.data.developers.sort((a, b) => a.name.localeCompare(b.name)).map(developer => (

              <div className="bg-white shadow rounded-lg p-4"
                key={developer.id}>

                <div className="font-bold flex justify-between"><span>@{developer.username}</span>
                  <Tooltip text={t('Click to remove the developer from the team')}>
                    <Fa className="cursor-pointer" onClick={() => handleRemoveDeveloperFromTeam(developer)} icon="fa-trash"
                      color="red" />
                  </Tooltip>
                </div>

                <div className="border-b-2 border-gray-200 my-2"></div>
                <div className="text-sm">{t('Name')}: {t(developer.name)}</div>
                <div className="text-sm">{t('Role')}: {t(developer.role_label)}</div>
                {/* <div class="text-sm">{ t('Email: ') } { privacy.active ? '***@***' : developer.email }</div> */}


              </div>
            ))}
          </div>

          <FormSaveButton disabled={form.submitting} loading={form.submitting} onClick={updateResource}>{t('Save')}</FormSaveButton>

        </PageContent >
      }
      <Modal
        show={addDeveloperToTeamModal.visible}
        closeable={true}
        onClose={closeAddDeveloperToTeamModal}
        maxWidth='w-[75vw]'
      >
        <div className="min-h-[50vh] w-full p-6 shadow-none border-none">
          <h2 className="text-xl font-bold mb-2">{t('Add developer to team')}</h2>
          <TextInput className="w-full"
            // v-model="addDeveloperToTeamModal.search" 
            value={addDeveloperToTeamModal.search}
            onChange={(e) => {
              setAddDeveloperToTeamModal(prevState => ({ ...prevState, search: e.target.value }));
              debouncedSearchDevelopers();
            }}
            placeholder={t('Type to search for a developer by email or name')} />
          <div>
            <Loading condition={addDeveloperToTeamModal.loading} />
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
              {addDeveloperToTeamModal.developers.sort((a, b) => a.name.localeCompare(b.name)).map(developer => (

                <div className="bg-white shadow rounded-lg p-4"
                  key={developer.id}>

                  <div className="font-bold flex justify-between">@{developer.username}<PrimaryButton
                    onClick={() => {
                      setForm(prevState => ({ ...prevState, data: { ...prevState.data, developers: [...prevState.data.developers, developer] } }));

                      fetchDevelopers();
                    }} type="button">{
                      t('Add')
                    }</PrimaryButton></div>

                  <div className="border-b-2 border-gray-200 my-2"></div>
                  <div className="text-sm">{t('Name')}: {t(developer.name)}</div>
                  <div className="text-sm">{t('Role')}: {t(developer.role_label)}</div>
                  {/* <div class="text-sm">{ t('Email: ') } { privacy.active ? '***@***' : developer.email }</div> */}


                </div>
              ))}
              {/* <div className="bg-white shadow rounded-lg p-4"
                v-for="developer in addDeveloperToTeamModal.developers.sort((a, b) => a.name.localeCompare(b.name))"
                            :key="developer.id">
              <div className="font-bold flex justify-between">@{ developer.username }<PrimaryButton
                                    @click="form.data.developers.push(developer); fetchDevelopers();" type="button">{
                  t('Add')
                }</PrimaryButton> */}
              {/* </div> */}
              {/* <div className="border-b-2 border-gray-200 my-2"></div> */}
              {/* <div className="text-sm">{t('Name')}: {t(developer.name)}</div>
              <div className="text-sm">{t('Role')}: {t(developer.role_label)}</div> */}
              {/* <div className="text-sm">{ t('Email: ') } { privacy.active ? '***@***' : developer.email } */}
              {/* </div> */}
            </div>
            {/* </div> */}
          </div>
        </div >
      </Modal >
    </>
  );
}