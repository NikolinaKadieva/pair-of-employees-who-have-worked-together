export function findCommonProjects (emp1, emp2) {
    const commonProjects = [];

    const emp1DateFrom = new Date(emp1.DateFrom);
    const emp2DateFrom = new Date(emp2.DateFrom);
    let emp1DateTo = emp1.DateTo === null ? new Date() : new Date(emp1.DateTo);
    let emp2DateTo = emp2.DateTo === null ? new Date() : new Date(emp2.DateTo);
    emp1DateTo.setDate(emp1DateTo.getDate() + 1);
    emp2DateTo.setDate(emp2DateTo.getDate() + 1);

    const commonStartDate = new Date(Math.max(emp1DateFrom, emp2DateFrom));
    const commonEndDate = new Date(Math.min(emp1DateTo, emp2DateTo));

    if (commonStartDate <= commonEndDate) {
        const duration = Math.floor((commonEndDate - commonStartDate) / (1000 * 60 * 60 * 24));

        commonProjects.push({
            employees: [emp1.EmpID, emp2.EmpID],
            duration: duration,
            project: emp1.ProjectID
        });

    }
    return commonProjects;
};