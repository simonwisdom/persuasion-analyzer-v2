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

              {profileData.demographic_profile?.Certifications && profileData.demographic_profile.Certifications.length > 0 && (
                <>
                  <h3>Certifications</h3>
                  <ul>
                    {profileData.demographic_profile.Certifications.map((cert, index) => (
                      <li key={index}>
                        <p><strong>Name:</strong> {cert.Name}</p>
                        <p><strong>Authority:</strong> {cert.Authority}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {profileData.demographic_profile?.["Accomplishment Projects"] && profileData.demographic_profile["Accomplishment Projects"].length > 0 && (
                <>
                  <h3>Projects</h3>
                  <ul>
                    {profileData.demographic_profile["Accomplishment Projects"].map((proj, index) => (
                      <li key={index}>
                        <p><strong>Title:</strong> {proj.title}</p>
                        <p><strong>Description:</strong> {proj.description}</p>
                        {proj.url && <p><strong>URL:</strong> <a href={proj.url} target="_blank" rel="noopener noreferrer">{proj.url}</a></p>}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {profileData.demographic_profile?.["Accomplishment Organisations"] && profileData.demographic_profile["Accomplishment Organisations"].length > 0 && (
                <>
                  <h3>Organisations</h3>
                  <ul>
                    {profileData.demographic_profile["Accomplishment Organisations"].map((org, index) => (
                      <li key={index}>{typeof org === 'string' ? org : JSON.stringify(org)}</li>
                    ))}
                  </ul>
                </>
              )}

              {profileData.demographic_profile?.["Accomplishment Patents"] && profileData.demographic_profile["Accomplishment Patents"].length > 0 && (
                <>
                  <h3>Patents</h3>
                  <ul>
                    {profileData.demographic_profile["Accomplishment Patents"].map((pat, index) => (
                      <li key={index}>{typeof pat === 'string' ? pat : JSON.stringify(pat)}</li>
                    ))}
                  </ul>
                </>
              )}

              {profileData.demographic_profile?.["Accomplishment Publications"] && profileData.demographic_profile["Accomplishment Publications"].length > 0 && (
                <>
                  <h3>Publications</h3>
                  <ul>
                    {profileData.demographic_profile["Accomplishment Publications"].map((pub, index) => (
                      <li key={index}>
                        <p><strong>Name:</strong> {pub.name}</p>
                        <p><strong>Description:</strong> {pub.description}</p>
                        <p><strong>Published On:</strong> {pub.published_on}</p>
                        <p><strong>Publisher:</strong> {pub.publisher}</p>
                        <p><strong>URL:</strong> <a href={pub.url} target="_blank" rel="noopener noreferrer">{pub.url}</a></p>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {profileData.demographic_profile?.["Accomplishment Test Scores"] && profileData.demographic_profile["Accomplishment Test Scores"].length > 0 && (
                <>
                  <h3>Test Scores</h3>
                  <ul>
                    {profileData.demographic_profile["Accomplishment Test Scores"].map((score, index) => (
                      <li key={index}>{typeof score === 'string' ? score : JSON.stringify(score)}</li>
                    ))}
                  </ul>
                </>
              )}

              {profileData.demographic_profile?.Activities && profileData.demographic_profile.Activities.length > 0 && (
                <>
                  <h3>Activities</h3>
                  <ul>
                    {profileData.demographic_profile.Activities.map((activity, index) => (
                      <li key={index}>
                        <p><strong>Title:</strong> {activity.title}</p>
                        <p><strong>Link:</strong> <a href={activity.link} target="_blank" rel="noopener noreferrer">{activity.link}</a></p>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {profileData.demographic_profile?.Articles && profileData.demographic_profile.Articles.length > 0 && (
                <>
                  <h3>Articles</h3>
                  <ul>
                    {profileData.demographic_profile.Articles.map((article, index) => (
                      <li key={index}>{typeof article === 'string' ? article : JSON.stringify(article)}</li>
                    ))}
                  </ul>
                </>
              )}

              {profileData.demographic_profile?.["Background Cover Image URL"] && (
                <>
                  <h3>Background Cover Image</h3>
                  <img src={profileData.demographic_profile["Background Cover Image URL"]} alt="Background Cover" />
                </>
              )}

              {profileData.demographic_profile?.Groups && profileData.demographic_profile.Groups.length > 0 && (
                <>
                  <h3>Groups</h3>
                  <ul>
                    {profileData.demographic_profile.Groups.map((group, index) => (
                      <li key={index}><a href={group.url} target="_blank" rel="noopener noreferrer">{group.name}</a></li>
                    ))}
                  </ul>
                </>
              )}

              {profileData.demographic_profile?.Languages && profileData.demographic_profile.Languages.length > 0 && (
                <>
                  <h3>Languages</h3>
                  <ul>
                    {profileData.demographic_profile.Languages.map((language, index) => (
                      <li key={index}>{typeof language === 'string' ? language : JSON.stringify(language)}</li>
                    ))}
                  </ul>
                </>
              )}

              {profileData.demographic_profile?.Recommendations && profileData.demographic_profile.Recommendations.length > 0 && (
                <>
                  <h3>Recommendations</h3>
                  <ul>
                    {profileData.demographic_profile.Recommendations.map((rec, index) => (
                      <li key={index}>{typeof rec === 'string' ? rec : JSON.stringify(rec)}</li>
                    ))}
                  </ul>
                </>
              )}

              {profileData.demographic_profile?.["Volunteer Work"] && profileData.demographic_profile["Volunteer Work"].length > 0 && (
                <>
                  <h3>Volunteer Work</h3>
                  <ul>
                    {profileData.demographic_profile["Volunteer Work"].map((work, index) => (
                      <li key={index}>{typeof work === 'string' ? work : JSON.stringify(work)}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default DisplayRawData;
