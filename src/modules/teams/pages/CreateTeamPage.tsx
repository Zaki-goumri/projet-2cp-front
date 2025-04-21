import React from 'react';
import CreateTeamCard from '../components/CreateTeamCard';

const CreateTeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto">
        <CreateTeamCard />
      </div>
    </div>
  );
};

export default CreateTeamPage;
