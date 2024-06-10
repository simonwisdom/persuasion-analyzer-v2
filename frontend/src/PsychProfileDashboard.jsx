import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ScatterChart, Scatter, Label, ResponsiveContainer, ReferenceArea, ReferenceDot } from 'recharts';
import ReactSpeedometer from "react-d3-speedometer";
import './styles/sage.css';

const PsychProfileDashboard = ({ profileData, psychologicalProfile }) => {
  if (!profileData || !psychologicalProfile) {
    return null;
  }

  const bigFiveData = psychologicalProfile["Personality Traits"]?.["Big Five"] ? [
    { trait: 'Openness', value: parseFloat(psychologicalProfile["Personality Traits"]["Big Five"].Openness) },
    { trait: 'Conscientiousness', value: parseFloat(psychologicalProfile["Personality Traits"]["Big Five"].Conscientiousness) },
    { trait: 'Extraversion', value: parseFloat(psychologicalProfile["Personality Traits"]["Big Five"].Extraversion) },
    { trait: 'Agreeableness', value: parseFloat(psychologicalProfile["Personality Traits"]["Big Five"].Agreeableness) },
    { trait: 'Neuroticism', value: parseFloat(psychologicalProfile["Personality Traits"]["Big Five"].Neuroticism) },
  ] : [];

  const valuesData = psychologicalProfile["Values and Motivations"]
    ? Object.entries(psychologicalProfile["Values and Motivations"]).flatMap(([category, values]) =>
        Object.entries(values).map(([name, value]) => ({
          text: name,
          value: parseFloat(value)
        }))
      )
    : [];

  const toneValue = parseFloat(psychologicalProfile["Communication Style"]?.["Tone and Language"]?.Informal) || 0;

  const mbtiTypes = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];
  const actualMbtiType = psychologicalProfile["Personality Traits"]?.["MBTI Type"];
  const mbtiFullNames = {
    'ISTJ': { title: 'Inspector', description: 'Introverted, Sensing, Thinking, Judging' },
    'ISFJ': { title: 'Protector', description: 'Introverted, Sensing, Feeling, Judging' },
    'INFJ': { title: 'Counselor', description: 'Introverted, Intuitive, Feeling, Judging' },
    'INTJ': { title: 'Mastermind', description: 'Introverted, Intuitive, Thinking, Judging' },
    'ISTP': { title: 'Crafter', description: 'Introverted, Sensing, Thinking, Perceiving' },
    'ISFP': { title: 'Composer', description: 'Introverted, Sensing, Feeling, Perceiving' },
    'INFP': { title: 'Healer', description: 'Introverted, Intuitive, Feeling, Perceiving' },
    'INTP': { title: 'Architect', description: 'Introverted, Intuitive, Thinking, Perceiving' },
    'ESTP': { title: 'Dynamo', description: 'Extraverted, Sensing, Thinking, Perceiving' },
    'ESFP': { title: 'Performer', description: 'Extraverted, Sensing, Feeling, Perceiving' },
    'ENFP': { title: 'Champion', description: 'Extraverted, Intuitive, Feeling, Perceiving' },
    'ENTP': { title: 'Visionary', description: 'Extraverted, Intuitive, Thinking, Perceiving' },
    'ESTJ': { title: 'Supervisor', description: 'Extraverted, Sensing, Thinking, Judging' },
    'ESFJ': { title: 'Provider', description: 'Extraverted, Sensing, Feeling, Judging' },
    'ENFJ': { title: 'Teacher', description: 'Extraverted, Intuitive, Feeling, Judging' },
    'ENTJ': { title: 'Commander', description: 'Extraverted, Intuitive, Thinking, Judging' }
  };
  
  const economicValue = psychologicalProfile["Values and Motivations"]?.Political?.Economic || 0;
  const socialValue = psychologicalProfile["Values and Motivations"]?.Political?.Social || 0;

  return (
    <div className="grid grid-cols-3 gap-4 fade-in">
  <div className="card bg-white p-4 rounded shadow text-center">
    <h2 className="text-lg font-bold mb-2">Demographics</h2>
    <div>Age: {psychologicalProfile.Demographics?.Age}</div>
    <div>Gender: {psychologicalProfile.Demographics?.Gender}</div>
    <div>Location: {psychologicalProfile.Demographics?.Location}</div>
    <div>Marital Status: {psychologicalProfile.Demographics?.["Marital Status"]}</div>
  </div>

  <div className="card bg-white p-4 rounded shadow text-center">
    <h2 className="text-lg font-bold mb-2">Personality Traits</h2>
    {bigFiveData.length > 0 ? (
      <div className="flex justify-center items-center">
        <RadarChart outerRadius={60} width={420} height={220} data={bigFiveData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="trait" />
          <PolarRadiusAxis />
          <Radar name="Big Five Traits" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </div>
    ) : (
      <div>No Big Five data available</div>
    )}
  </div>

  <div className="card bg-white p-4 rounded shadow text-center">
    <h2 className="text-lg font-bold mb-2">MBTI Type</h2>
    <div className="text-center mb-2">
      <h3 className="text-md font-semibold">"The {mbtiFullNames[actualMbtiType]?.title}"</h3>
      <p>{mbtiFullNames[actualMbtiType]?.description}</p>
    </div>
    <div className="grid grid-cols-4 gap-1">
      {mbtiTypes.map((type) => (
        <div
          key={type}
          className={`p-1 text-center text-sm ${type === actualMbtiType ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
          {type}
        </div>
      ))}
    </div>
  </div>

  <div className="card bg-white p-4 rounded shadow text-center">
    <h2 className="text-lg font-bold mb-2">Values and Motivations</h2>
    <div className="grid grid-cols-2 gap-2">
      {valuesData.slice(0, 8).map((value, index) => (
        <div key={index} className="text-center text-sm font-semibold p-2 bg-gray-100 rounded shadow">
          {value.text}
        </div>
      ))}
    </div>
  </div>

  <div className="card bg-white p-4 rounded shadow text-center">
    <h2 className="text-lg font-bold mb-2">Political Leaning</h2>
    <ResponsiveContainer width="100%" height={250}>
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          domain={[-1, 1]}
          tickFormatter={(tick) => `${tick}`}
          stroke="#000"
          strokeWidth={2}
        />
        <YAxis
          type="number"
          dataKey="y"
          domain={[-1, 1]}
          tickFormatter={(tick) => `${tick}`}
          stroke="#000"
          strokeWidth={2}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Values" data={[{ x: economicValue, y: socialValue }]} fill="#8884d8" />
        <ReferenceArea x1={-1} x2={0} y1={0} y2={1} fill="rgba(128, 128, 128, 0.2)" />
        <ReferenceArea x1={0} x2={1} y1={0} y2={1} fill="rgba(128, 0, 128, 0.2)" />
        <ReferenceArea x1={-1} x2={0} y1={-1} y2={0} fill="rgba(128, 0, 128, 0.2)" />
        <ReferenceArea x1={0} x2={1} y1={-1} y2={0} fill="rgba(128, 128, 128, 0.2)" />
        <ReferenceDot x={0} y={0.2} r={0} isFront>
          <Label value="Libertarian" position="top" offset={10} style={{ fontSize: '12px' }} />
        </ReferenceDot>
        <ReferenceDot x={0} y={-0.2} r={0} isFront>
          <Label value="Authoritarian" position="bottom" offset={10} style={{ fontSize: '12px' }} />
        </ReferenceDot>
        <ReferenceDot x={-0.2} y={0} r={0} isFront>
          <Label value="Economic Left" position="left" offset={10} style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }} />
        </ReferenceDot>
        <ReferenceDot x={0.2} y={0} r={0} isFront>
          <Label value="Economic Right" position="right" offset={10} style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }} />
        </ReferenceDot>
      </ScatterChart>
    </ResponsiveContainer>
  </div>

  <div className="card bg-white p-4 rounded shadow text-center">
    <h2 className="text-lg font-bold mb-2">Preferred Tone</h2>
    <ReactSpeedometer
      value={toneValue*100}
      labelFontSize="10px"
      valueTextFontSize="14px"
      minValue={0}
      maxValue={100}
      segments={3}
      currentValueText=""
      textColor="#8884d8"
      needleTransitionDuration={4000}
      needleTransition="easeElastic"
      ringWidth={10}
      height={100}
      needleColor="#8884d8"
      segmentColors={['#D0B3FF', '#B380FF', '#8A2BE2']}
    />
    <div className="flex justify-between mt-2 text-sm">
      <span className="text-gray-600">Formal</span>
      <span className="text-gray-600">Informal</span>
    </div>
  </div>

</div>

  );
};

export default PsychProfileDashboard;
