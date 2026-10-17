const VALID_STATUSES = ['To Do', 'In Progress', 'Completed'];
const VALID_PRIORITIES = ['Low', 'Medium', 'High'];

// Returns an array of error messages. Empty array means valid.
function validateTask(data) {
    const errors = [];

    if (!data.name || data.name.trim() === '') {
        errors.push('Task name is required.');
    }
    if (!data.member) {
        errors.push('Please select a team member.');
    }
    if (!VALID_PRIORITIES.includes(data.priority)) {
        errors.push('Please select a valid priority.');
    }
    if (!data.deadline) {
        errors.push('Deadline is required.');
    }
    if (!VALID_STATUSES.includes(data.status)) {
        errors.push('Please select a valid status.');
    }

    return errors;
}

// Builds a clean task object from form data.
function createTask(data, id) {
    return {
        id: id,
        name: data.name.trim(),
        description: (data.description || '').trim(),
        member: data.member,
        priority: data.priority,
        deadline: data.deadline,
        status: data.status
    };
}

// Filters by search text (name or description), status, and priority.
function filterTasks(tasks, options = {}) {
    const search = (options.search || '').trim().toLowerCase();
    const status = options.status || 'All';
    const priority = options.priority || 'All';

    return tasks.filter(function(task) {
        const matchesSearch =
            search === '' ||
            task.name.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search);

        const matchesStatus = status === 'All' || task.status === status;
        const matchesPriority = priority === 'All' || task.priority === priority;

        return matchesSearch && matchesStatus && matchesPriority;
    });
}

// Counts for the dashboard cards.
function computeStats(tasks) {
    return {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'Completed').length,
        inProgress: tasks.filter(t => t.status === 'In Progress').length,
        todo: tasks.filter(t => t.status === 'To Do').length
    };
}

// Number of tasks assigned to one member.
function countTasksByMember(tasks, member) {
    return tasks.filter(t => t.member === member).length;
}

// Lets Jest import these functions. Browsers ignore this block.
if (typeof module !== 'undefined') {
    module.exports = {
        VALID_STATUSES,
        VALID_PRIORITIES,
        validateTask,
        createTask,
        filterTasks,
        computeStats,
        countTasksByMember
    };
}