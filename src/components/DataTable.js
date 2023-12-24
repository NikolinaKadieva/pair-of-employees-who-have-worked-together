import { useLocation } from "react-router-dom";

function DataTable() {
    const location = useLocation();
    const projects = location.state["data"];
    console.log(projects);
    projects.map((row) => {
        for (let curr of row.projectsList) {
          console.log(curr.project, curr.duration);
        }
    })

    projects.map((row) => {
        row.projectsList.map((curr) => {
           console.log(curr.duration, curr.project);
        })
    })


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
                        )
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
                    {
                        projects.map((row) => {
                          for (const element of row.projectsList) {
                            return (
                                <tr>
                                    <td>{element.project}</td>
                                    <td>{element.duration}</td>
                                </tr>
                            )
                          }
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default DataTable;