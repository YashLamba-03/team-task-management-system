const {
    validateTask,
    createTask,
    filterTasks,
    computeStats,
    countTasksByMember
} = require("../js/tasklogic");

const sampleTasks = [
    { id: 1, name: 'Design login page', description: 'Make it simple', member: 'Member 1', priority: 'High', deadline: '2026-01-10', status: 'Completed' },
    { id: 2, name: 'Write README', description: 'Document setup', member: 'Member 2', priority: 'Low', deadline: '2026-02-01', status: 'To Do' },
    { id: 3, name: 'Build dashboard', description: 'Stats cards', member: 'Member 1', priority: 'Medium', deadline: '2026-03-01', status: 'In Progress' }
];

test('validateTask returns no errors for complete data', () => {
    const errors = validateTask({
        name: 'New task', member: 'Member 1', priority: 'High',
        deadline: '2026-05-01', status: 'To Do'
    });
    expect(errors).toEqual([]);
});

test('validateTask rejects an empty task name', () => {
    const errors = validateTask({
        name: '   ', member: 'Member 1', priority: 'High',
        deadline: '2026-05-01', status: 'To Do'
    });
    expect(errors).toContain('Task name is required.');
});

test('filterTasks filters by status and search text', () => {
    const result = filterTasks(sampleTasks, { status: 'Completed' });
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Design login page');

    const searched = filterTasks(sampleTasks, { search: 'readme' });
    expect(searched.length).toBe(1);
    expect(searched[0].id).toBe(2);
});

test('computeStats counts tasks by status', () => {
    expect(computeStats(sampleTasks)).toEqual({
        total: 3, completed: 1, inProgress: 1, todo: 1
    });
});

test('countTasksByMember counts tasks for one member', () => {
    expect(countTasksByMember(sampleTasks, 'Member 1')).toBe(2);
    expect(countTasksByMember(sampleTasks, 'Member 2')).toBe(1);
});