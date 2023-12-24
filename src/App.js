import './App.css';
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { parseCSV } from './utils/parseCSV.js';
import { findCommonProjects } from './utils/commonProjects.js';

function App() {
    const [projects, setProjects] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const csvData = e.target.result;
                const parsedProjects = parseCSV(csvData);
                setProjects(findLongestWorkingPairs(parsedProjects));
            };

            reader.readAsText(file);
        }
    };

    const findLongestWorkingPairs = (projects) => {
        const employeeProjects = {};
        const processedPairs = new Set();

        projects.map((project) => {
            const projectID = project.ProjectID;

            if (!employeeProjects[projectID]) {
                employeeProjects[projectID] = [];
            }

            employeeProjects[projectID].push(project);
        });

        let longestPairs = [];

        Object.values(employeeProjects).map((projectsList) => {
            projectsList.map((empObj1) => {
                projectsList.map((empObj2) => {
                    if (empObj1.EmpID !== empObj2.EmpID) {
                        const pairKey = `${empObj1.EmpID}-${empObj2.EmpID}-${empObj2.ProjectID}-${empObj2.DateFrom}-${empObj2.DateTo}`;
                        const reversePairKey = `${empObj2.EmpID}-${empObj1.EmpID}-${empObj1.ProjectID}-${empObj1.DateFrom}-${empObj1.DateTo}`;

                        if (!processedPairs.has(pairKey)) {
                            let pairs = findCommonProjects(empObj1, empObj2);

                            pairs.map((pair) => {
                                pair.employees.sort((a, b) => a - b);
                            });

                            pairs.map((pair1) => {
                                const objectWithKeyValue = longestPairs.find(
                                    (obj) =>
                                        obj['employees'] &&
                                        JSON.stringify(obj['employees']) ===
                                        JSON.stringify(pair1.employees)
                                );
                                if (objectWithKeyValue) {
                                    const pairIndex = longestPairs.findIndex(
                                        (pair) =>
                                            JSON.stringify(pair.employees) ==
                                            JSON.stringify(pair1.employees)
                                    );
                                    longestPairs[pairIndex].duration +=
                                        pair1.duration;

                                    longestPairs[pairIndex].projectsList.push({
                                        duration: pair1.duration,
                                        project: pair1.project,
                                    });
                                } else {
                                    let newPair = pair1;
                                    newPair.projectsList = [];

                                    newPair.projectsList.push({
                                        duration: pair1.duration,
                                        project: pair1.project,
                                    });

                                    longestPairs.push(newPair);
                                }
                            });

                            if (!processedPairs.has(pairKey)) {
                                processedPairs.add(reversePairKey);
                            }
                        }
                    }
                });
            });
        });

        const sortedPairs = longestPairs
            .slice()
            .sort((a, b) => b.duration - a.duration);

        const maxDuration = sortedPairs.length > 0 ? sortedPairs[0].duration : 0;

        let filteredPairs = sortedPairs.filter(
            (item) => item.duration === maxDuration
        );

        const projectDurationsMap = new Map();

        filteredPairs.map((item) => {
            const { projectsList } = item;

            projectsList.map(({ duration, project }) => {
                if (projectDurationsMap.has(project)) {
                    projectDurationsMap.set(
                        project,
                        projectDurationsMap.get(project) + duration
                    );
                } else {
                    projectDurationsMap.set(project, duration);
                }
            });
        });

        const processedProjects = new Set();

        const resultArray = filteredPairs.map((item) => {
            const { projectsList } = item;
            const updatedProjectsList = projectsList
                .map(({ duration, project }) => {
                    if (processedProjects.has(project)) {
                        return null;
                    } else {
                        processedProjects.add(project);
                        return {
                            duration: projectDurationsMap.get(project),
                            project,
                        };
                    }
                })
                .filter(Boolean);

            return {
                ...item,
                projectsList: updatedProjectsList,
            };
        });

        return resultArray;
    };

    return (
        <div className="App">
            <div>
                <div className="nav-div">
                    <nav>
                        <NavLink to={'/'}>Home</NavLink>
                        <NavLink
                            to={'/pairs-of-employees'}
                            state={{ data: projects }}
                        >
                            Pairs of employees
                        </NavLink>
                    </nav>
                </div>
                <div className="content-div">
                    <Outlet />
                </div>
            </div>
            <h1>Longest Working Pairs</h1>
            <div className="input-container">
                <label htmlFor="files" className="btn">
                    Browse Files
                </label>
                <input
                    type="file"
                    id="files"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}

export default App;

