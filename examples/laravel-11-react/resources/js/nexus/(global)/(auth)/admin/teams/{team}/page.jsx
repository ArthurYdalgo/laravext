import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import usePrivacy from '@/hooks/usePrivacy'
import { useTranslation } from 'react-i18next';
import { routeParams } from '@laravext/react';
import Swal from 'sweetalert2';
import DangerButton from '@/components/DangerButton';
import Header from '@/components/Header';
import Link from '@/components/Link';
import Loading from '@/components/Loading';
import PageContent from '@/components/PageContent';
import PrimaryButton from '@/components/PrimaryButton';

const TeamPage = () => {
  const { t } = useTranslation();
  const { setActive: setPrivacyActive, active: privacyIsActive, toggle: togglePrivacy } = usePrivacy();

  const [teamData, setTeamData] = useState({
    data: {},
    loading: true,
  });

  useEffect(() => {
    setTeamData({ ...teamData, loading: true });

    axios.get(`/api/teams/${routeParams().team}`)
      .then(response => {
        setTeamData({
          data: {
            id: response.data.id,
            name: response.data.name,
            developers: response.data.developers,
          },
          loading: false,
        });
      });
  }, []);

  const destroyResource = (id) => {
    Swal.fire({
      title: t('Are you sure?'),
      icon: 'warning',
      confirmButtonText: t('Yes, delete it!'),
      cancelButtonText: t('No, cancel!'),
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      showCancelButton: true,
      showCloseButton: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/api/teams/${id}`)
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

  return (
    <>
      <Header>{teamData.loading ? t('Loading...') : `#${teamData.data.id} - ${teamData.data.name}`}</Header>
      <div className="mt-3 mx-4 flex justify-end space-x-2">
        <Link href={`/admin/teams/${routeParams().team}/edit`}>
          <PrimaryButton>{t('Edit')}</PrimaryButton>
        </Link>

        <DangerButton onClick={() => destroyResource(routeParams().team)} className="hover:text-red-900">
          {t('Delete')}
        </DangerButton>
      </div>
      {teamData.loading ? (
        <Loading />
      ) : (
        <PageContent>
          <Link href={`/admin/teams/${routeParams().team}/projects`} className="text-blue-600 text-xl font-bold">
            {t('Click to view projects of Team')} #{routeParams().team}
          </Link>
          <br />
          <span className="text-lg font-bold">{t('Name')}: </span>{teamData.data.name}
          <br />
          <span className="text-lg font-bold">{t('Developers')}:</span>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {teamData.data.developers.sort((a, b) => a.name.localeCompare(b.name)).map(developer => (
              <div className="bg-white rounded-lg shadow p-4" key={developer.id}>
                <div className="font-bold">@{developer.username}</div>
                <div className="border-b-2 border-gray-200 my-2"></div>
                <div className="text-sm">{t('Name')}: {t(developer.name)}</div>
                <div className="text-sm">{t('Role')}: {t(developer.role_label)}</div>
                <div className="text-sm">Email: {privacyIsActive ? '***@***' : developer.email}</div>
              </div>
            ))}
          </div>
        </PageContent>
      )}
    </>
  );
};

export default TeamPage;
