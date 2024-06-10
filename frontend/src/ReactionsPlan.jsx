import React from 'react';
import './styles/sage.css';

const ReactionsPlan = ({ planData }) => {
    const { reactions = {}, plan = {} } = planData || {};

    const sortedPlans = Object.entries(plan).sort((a, b) => b[1].success_probability - a[1].success_probability);

    const getColorClass = (probability) => {
        if (probability >= 0.7) return 'bg-green-200';
        if (probability >= 0.4) return 'bg-yellow-200';
        return 'bg-red-200';
    };

    return (
        <div className="reactions-plan my-4 fade-in">
            <h2 className="text-xl font-bold mb-4">Persuasion Plan</h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="reactions">
                    <h3 className="text-lg font-semibold mb-2">Observations</h3>
                    <div className="cards">
                        {Object.keys(reactions).length > 0 ? (
                            Object.entries(reactions).map(([key, reaction], index) => (
                                <div key={index} className="card mb-4 p-4 border rounded shadow">
                                    <h4 className="text-md font-medium mb-2">Observation {index + 1}</h4>
                                    <p>{reaction}</p>
                                </div>
                            ))
                        ) : (
                            <div className="card mb-4 p-4 border rounded shadow">
                                <p>No observations available</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="plan">
                    <h3 className="text-lg font-semibold mb-2">Persuasion Strategy Analysis</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {sortedPlans.length > 0 ? (
                            sortedPlans.map(([key, value], index) => (
                                <div key={index} className={`plan-card mb-4 p-4 border rounded shadow ${getColorClass(value.success_probability)}`}>
                                    <h4 className="text-md font-medium mb-2">{key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h4>
                                    <div>
                                        <p className="mb-2">{value.plan_details}</p>
                                        <p className="mb-2"><strong>Success Probability:</strong> {value.success_probability}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="plan-card mb-4 p-4 border rounded shadow">
                                <p>No plan available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReactionsPlan;
