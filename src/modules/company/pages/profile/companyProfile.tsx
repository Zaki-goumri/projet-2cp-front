import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProfileInfo from '@/modules/ProfileManagement/components/profileInfo';
import { User } from '@/modules/shared/types/user.types';
import { useUserInfo, useProfileUpdate } from '@/modules/ProfileManagement/hooks/useUserService';
import { useUserStore } from '@/modules/shared/store/userStore';
import ErrorBoundary from '@/modules/ProfileManagement/components/ErrorBoundary';
import { Spinner } from '@/modules/shared/components';
import UserNotFound from '@/modules/ProfileManagement/components/UserNotFound';
import { useOpportunities } from '@/modules/opportunities/hooks/useOpportunities';
import { OpportunityCard } from '@/modules/opportunities/page';

type ParamsType = { companyName: string };

export default function CompanyProfile() {
  const { companyName } = useParams<ParamsType>();
  const { data, isLoading, isError } = useUserInfo(companyName!);
  const currentUserName = useUserStore((state) => state.user?.name);
  const [isEditing, setIsEditing] = useState(false);
  const { updateProfile, isLoading: isUpdating } = useProfileUpdate();
  const sameUser = companyName === currentUserName;

  // State for all sections
  const [aboutMe, setAboutMe] = useState('');
  const [profilePic, setProfilePic] = useState<File | null>(null);

  // Fetch opportunities
  const { opportunities, isLoading: isLoadingOpportunities } = useOpportunities();

  // Filter opportunities for this company
  const companyOpportunities = opportunities.filter(
    (opp) => opp.company.name === companyName
  );

  useEffect(() => {
    setAboutMe(data?.description || '');
    setIsEditing(false);
  }, [data]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes when exiting edit mode
      handleSaveChanges();
    }
    setIsEditing(!isEditing);
  };

  const handleAboutMeDesc = (text: string) => {
    setAboutMe(text);
  };

  const handleSaveChanges = () => {
    const updateData: any = {
      description: aboutMe,
    };

    if (profilePic) {
      updateData.profilepic = profilePic;
    }

    updateProfile({ sectionData: updateData, cb: () => setIsEditing(false) });
  };

  if (isLoading) return <Spinner size="lg" className="min-h-screen" />;
  if (isError || !data) return <UserNotFound />;

  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<Spinner size="lg" className="min-h-screen" />}>
        <ErrorBoundary>
          <section className="w-full px-4 py-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-[90rem] rounded-xl bg-[#92E3A91A] p-3 md:p-4">
              <ProfileInfo
                isCompany={true}
                isUserProfile={sameUser}
                isEditing={isEditing}
                isEditingLoading={isUpdating}
                onCancel={() => setIsEditing(false)}
                onEditToggle={handleEditToggle}
                user={data}
                onProfilePicChange={setProfilePic}
                onSave={handleSaveChanges}
                internShipCount={opportunities.length}
              />
              <div className="mt-3 space-y-3 md:space-y-4">
                <div className="rounded-xl bg-white p-4 md:p-6">
                  <div className="px-6 py-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#92E3A9]"
                          rows={4}
                          value={aboutMe}
                          onChange={(e) => handleAboutMeDesc(e.target.value)}
                          placeholder="Tell us about your company..."
                        />
                      </div>
                    ) : (
                      <p className="text-gray-700 whitespace-pre-line">
                        {aboutMe || 'No information provided yet.'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company Opportunities Section */}
                <div className="rounded-xl bg-white p-4 md:p-6">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900">Posted Opportunities</h2>
                  {isLoadingOpportunities ? (
                    <div className="flex justify-center py-8">
                      <Spinner size="md" />
                    </div>
                  ) : companyOpportunities.length > 0 ? (
                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {companyOpportunities.map((opportunity) => (
                        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-gray-500 py-8">
                      No opportunities posted yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}
