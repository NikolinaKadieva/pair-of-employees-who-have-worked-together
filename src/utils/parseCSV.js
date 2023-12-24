export function parseCSV (csvData) {
    const csvDataNoIntervals = csvData.replace(/\s/g, '');
    const currentDate = new Date();
    let [start, ...csvDataSplit] = csvDataNoIntervals.split('""').filter(Boolean);
    let end = csvDataSplit.pop();
    start = start.replace(/"/g, '');
    end = end.replace(/"/g, '');

    csvDataSplit.unshift(start);
    csvDataSplit.push(end);

    let parsedProjects = csvDataSplit.map(projectString => {
        const [id, project, dateFrom, dateTo] = projectString.split(",");

        return {
            EmpID: parseInt(id),
            ProjectID: parseInt(project),
            DateFrom: dateFrom === "NULL" ? currentDate : dateFrom,
            DateTo: dateTo === "NULL" ? currentDate : dateTo,
        };
    });

    return parsedProjects;
};