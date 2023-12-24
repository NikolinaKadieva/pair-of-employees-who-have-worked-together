import { useLocation } from 'react-router-dom';

function DataTable() {
    const location = useLocation();
    const projects = location.state['data'];
    const projectsForTable = [];
    
    projects.map((row) => {
        for (let el of row.projectsList) {
            projectsForTable.push(el);
        }
    });

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID - First Employee</th>
                        <th>ID - Second Employee</th>
                        <th>Days</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((row, index) => {
                        return (
                            <tr key={index}>
                                <td>{row.employees[0]}</td>
                                <td>{row.employees[1]}</td>
                                <td>{row.duration}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Working days</th>
                    </tr>
                </thead>
                <tbody>
                    {projectsForTable.map((el) => {
                        return (
                            <tr key={el.project}>
                                <td>{el.project}</td>
                                <td>{el.duration}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default DataTable;