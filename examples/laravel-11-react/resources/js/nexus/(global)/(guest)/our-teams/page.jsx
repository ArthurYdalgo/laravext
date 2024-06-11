import {Head, nexusProps} from '@laravext/react'

export default () => {
  const { teams } = nexusProps();

  return (
    <div>
        <Head>Our Teams</Head>
      <div className="flex justify-center items-center min-h-[70vh] mt-6">
        <div>
          <h3 className="text-2xl mb-2">Our teams...</h3>
          <ul>
            {teams.map(team => (
              <li key={team.id}>
                {team.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

