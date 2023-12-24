export function parseCSV (csvData) {
    const csvDataNoIntervals = csvData.replace(/\s/g, '');
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
            DateFrom: dateFrom === "NULL" ? null : dateFrom,
            DateTo: dateTo === "NULL" ? null : dateTo,
        };
    });

    return parsedProjects;
};