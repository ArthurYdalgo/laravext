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
    submitting: false,
  });

  const handleRemoveDeveloperFromTeam = (developer) => {
    setForm(prevState => ({ ...prevState, data: { ...prevState.data, developers: prevState.data.developers.filter(d => d.id !== developer.id) } }));
  };

  const createResource = () => {
    setForm(prevState => ({ ...prevState, submitting: true }));

    const data = {
      name: form.data.name,
      developer_ids: form.data.developers.map(developer => developer.id),
    };


    return axios.post(`/api/teams`, data)
      .then(() => {
        setForm(prevState => ({ ...prevState, submitting: false }));
        Swal.fire(t('Record created!'), t('The team has been created.'), 'success').then(() => {
          window.location.href = route('admin.teams');
        });
      })
      .catch(() => {
        setForm(prevState => ({ ...prevState, submitting: false }));
        Swal.fire(t('Error!'), t('An error occurred while creating the team.'), 'error');
      });
  };

  const [addDeveloperToTeamModal, setAddDeveloperToTeamModal, addDeveloperToTeamModalRef] = useStateRef({
    visible: false,
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
      search: '',
      developers: [],
      visible: false,
    });
  };

  return (
    <>
      <Header>{t('Create team')}</Header>

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
              <div className="text-sm">{t('Email: ')} {privacyIsActive ? '***@***' : developer.email}</div>


            </div>
          ))}
        </div>

        <FormSaveButton disabled={form.submitting} loading={form.submitting} onClick={createResource}>{t('Save')}</FormSaveButton>

      </PageContent >

      <Modal
        show={addDeveloperToTeamModal.visible}
        closeable={true}
        onClose={closeAddDeveloperToTeamModal}
        maxWidth='w-[75vw]'
      >
        <div className="min-h-[50vh] w-full p-6 shadow-none border-none">
          <h2 className="text-xl font-bold mb-2">{t('Add developer to team')}</h2>
          <TextInput className="w-full"
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
                  <div className="text-sm">{t('Email: ')} {privacyIsActive ? '***@***' : developer.email}</div>
                </div>
              ))}
            </div>
          </div>
        </div >
      </Modal >
    </>
  );
}