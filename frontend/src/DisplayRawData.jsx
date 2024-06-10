import { useEffect, useState } from 'react';

const DisplayRawData = ({ profileData }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (profileData?.demographic_profile?.['Profile Picture ID']) {
      const fetchImage = async () => {
        try {
          const imageId = profileData.demographic_profile['Profile Picture ID'].toString();
          const response = await fetch(`/api/images/${imageId}`);
          if (response.ok) {
            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setProfileImage(imageObjectURL);
          } else {
            console.error('Error fetching profile image:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching profile image:', error);
        }
      };
      fetchImage();
    }
  }, [profileData]);

  const renderObject = (obj) => {
    return Object.entries(obj).map(([key, value]) => (
      <p key={key}><strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}</p>
    ));
  };

  return (
    <div className="display-raw-data fade-in">
      {profileData && (
        <div className="profile-container">
          <div className="profile-card">
            <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
            {profileData?.demographic_profile?.Name && <p className="mb-1"><strong>Name:</strong> {profileData.demographic_profile.Name}</p>}
            {profileData?.demographic_profile?.Headline && <p className="mb-1"><strong>Headline:</strong> {profileData.demographic_profile.Headline}</p>}
            {profileData?.demographic_profile?.Location && <p className="mb-1"><strong>Location:</strong> {profileData.demographic_profile.Location}</p>}
            {profileData?.demographic_profile?.Industry && <p className="mb-1"><strong>Industry:</strong> {profileData.demographic_profile.Industry}</p>}
            {profileData?.demographic_profile?.Email && <p className="mb-1"><strong>Email:</strong> {profileData.demographic_profile.Email}</p>}
            {profileData?.demographic_profile?.["Phone Numbers"] && <p className="mb-1"><strong>Phone Numbers:</strong> {profileData.demographic_profile["Phone Numbers"]}</p>}
            {profileImage && (
              <p className="mb-1">
                <strong>Profile Picture:</strong>{" "}
                <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full" />
              </p>
            )}
          </div>

          <div className="collapsible-container">
            <h3 onClick={toggleCollapse} className="collapsible-toggle">
              {isCollapsed ? "Show More Details" : "Hide More Details"}
            </h3>
            <div className={`collapsible-content ${isCollapsed ? "" : "show"}`}>
              <div className="collapsible-content-inner">
                {profileData.demographic_profile?.Skills && profileData.demographic_profile.Skills.length > 0 && (
                  <>
                    <h3>Skills</h3>
                    <ul>
                      {profileData.demographic_profile.Skills.map((skill, index) => (
                        <li key={index}>{typeof skill === 'string' ? skill : JSON.stringify(skill)}</li>
                      ))}
                    </ul>
                  </>
                )}

                {profileData.demographic_profile?.Experiences && profileData.demographic_profile.Experiences.length > 0 && (
                  <>
                    <h3>Experience</h3>
                    <ul>
                      {profileData.demographic_profile.Experiences.map((exp, index) => (
                        <li key={index}>
                          <p><strong>Title:</strong> {exp.title}</p>
                          <p><strong>Company:</strong> <a href={exp.company_linkedin_profile_url} target="_blank" rel="noopener noreferrer">{exp.company}</a></p>
                          <p><strong>Location:</strong> {exp.location}</p>
                          <p><strong>Date Range:</strong> {exp.starts_at && new Date(exp.starts_at.year, exp.starts_at.month - 1, exp.starts_at.day).toLocaleDateString()} - {exp.ends_at ? new Date(exp.ends_at.year, exp.ends_at.month - 1, exp.ends_at.day).toLocaleDateString() : 'Present'}</p>
                          {exp.description && <p><strong>Description:</strong> {exp.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {/* Repeat similar structure for other sections like Education, Certifications, Projects, etc. */}
                {profileData.demographic_profile?.Education && profileData.demographic_profile.Education.length > 0 && (
                  <>
                    <h3>Education</h3>
                    <ul>
                      {profileData.demographic_profile.Education.map((edu, index) => (
                        <li key={index}>
                          <p><strong>School:</strong> {edu.school}</p>
                          <p><strong>Degree:</strong> {edu.degree_name}</p>
                          <p><strong>Field of Study:</strong> {edu.field_of_study}</p>
                          <p><strong>Date Range:</strong> {edu.starts_at && new Date(edu.starts_at.year, edu.starts_at.month - 1, edu.starts_at.day).toLocaleDateString()} - {edu.ends_at ? new Date(edu.ends_at.year, edu.ends_at.month - 1, edu.ends_at.day).toLocaleDateString() : 'Present'}</p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Add other sections as needed */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayRawData;
