import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayRawData from './DisplayRawData';
import Search from './Search';
import PsychProfileDashboard from './PsychProfileDashboard';
import ReactionsPlan from './ReactionsPlan';
import Chatbot from './Chatbot';
import './styles/sage.css';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center my-4">
    <div className="loader border-t-4 border-purple-500 rounded-full w-16 h-16 animate-spin"></div>
  </div>
);

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [psychologicalProfile, setPsychologicalProfile] = useState(null);
  const [persuasionPlan, setPersuasionPlan] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPsychProfile, setShowPsychProfile] = useState(false);
  const [showReactionsPlan, setShowReactionsPlan] = useState(false);
  const [showFinalButtons, setShowFinalButtons] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setProfileData(null);
    setPsychologicalProfile(null);
    setPersuasionPlan(null);
    setError('');
    setShowPsychProfile(false);
    setShowReactionsPlan(false);
    setShowFinalButtons(false);
    
    try {
      console.log(`Fetching profile data for: ${searchTerm}`);
      const response = await axios.post('/fetch-profile', { profileUrl: searchTerm });
      const fetchedProfileData = response.data;
      setProfileData(fetchedProfileData);
      console.log('Profile data fetched:', fetchedProfileData);
  
      const percentComplete = fetchedProfileData.demographic_profile['Percent Complete'];
      console.log('% complete:', percentComplete);
  
      if (percentComplete < 50) {
        setError('Profile data is less than 50% complete. Cannot continue analysis. Try a different profile link.');
        setLoading(false);
        return;
      }
  
      console.log('Analyzing profile data...');
      const analysisResponse = await axios.post('/analyze-profile', {
        profileData: fetchedProfileData,
        profileUrl: searchTerm
      });
      const { demographic_profile, psychological_profile, persuasion_plan } = analysisResponse.data;
  
      console.log('Demographic profile:', demographic_profile);
      console.log('Psychological profile:', psychological_profile);
      console.log('Persuasion plan:', persuasion_plan);
  
      setPsychologicalProfile(psychological_profile);
      setPersuasionPlan(persuasion_plan);
      setError('');
  
      console.log('Profile analysis complete.');
    } catch (error) {
      console.error('Error fetching or analyzing profile:', error);
      setError('Error fetching or analyzing profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-container">
      <div className="content-wrapper">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
        {loading ? <LoadingSpinner /> : <DisplayRawData profileData={profileData} className="fade-in" />}
        {error && <div className="error-message text-red-500 my-4">{error}</div>}
        {!loading && profileData && profileData.demographic_profile && profileData.demographic_profile['Percent Complete'] >= 50 && (
          <div className="flex justify-center">
            {!showPsychProfile && 
              <button className="px-4 py-2 mx-2 rounded-md bg-purple-500 text-white" onClick={() => setShowPsychProfile(true)}>
                Generate Psychometric Profile
              </button>
            }
          </div>
        )}

        {!loading && showPsychProfile && <PsychProfileDashboard profileData={profileData} psychologicalProfile={psychologicalProfile} className="fade-in" />}
        {!loading && persuasionPlan && persuasionPlan.reactions && persuasionPlan.plan && (
          <div className="flex justify-center">
            {showPsychProfile && !showReactionsPlan && (
              <button className="px-4 py-2 mx-2 rounded-md bg-purple-500 text-white" onClick={() => setShowReactionsPlan(true)}>
                Analyze Persuasion Opportunities
              </button>
            )}
          </div>
        )}
        {!loading && showReactionsPlan && persuasionPlan && persuasionPlan.reactions && persuasionPlan.plan && (
          <>
            <ReactionsPlan planData={{ reactions: persuasionPlan.reactions, plan: persuasionPlan.plan }} className="fade-in" />
            <div className="flex justify-center">
              {!showFinalButtons && (
                <button className="px-4 py-2 mx-2 rounded-md bg-purple-500 text-white" onClick={() => setShowFinalButtons(true)}>
                  Decide Persuasion Strategy
                </button>
              )}
            </div>
          </>
        )}

        {!loading && showFinalButtons && (
          <Chatbot
            persuasionPlans={persuasionPlan.plan || []}
            psychologicalProfile={psychologicalProfile}
          />
        )}
      </div>
    </div>
  );
};

export default App;
