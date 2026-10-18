let tasks = [];
let nextId = 1;
let editingId = null;

const STATUSES = ['To Do', 'In Progress', 'Completed'];


// ---------- Navigation ----------

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(function(section) {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}


// ---------- Form ----------

function openTaskForm() {
    clearForm();
    document.getElementById('taskFormTitle').textContent = 'Add New Task';
    document.getElementById('saveTaskBtn').textContent = 'Create Task';
    document.getElementById('taskForm').classList.remove('hidden');
}

function closeTaskForm() {
    document.getElementById('taskForm').classList.add('hidden');
    clearForm();
}

function clearForm() {
    editingId = null;
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskMember').value = '';
    document.getElementById('taskPriority').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskStatus').value = 'To Do';
}

function readForm() {
    return {
        name: document.getElementById('taskName').value,
        description: document.getElementById('taskDescription').value,
        member: document.getElementById('taskMember').value,
        priority: document.getElementById('taskPriority').value,
        deadline: document.getElementById('taskDeadline').value,
        status: document.getElementById('taskStatus').value
    };
}

// Called by the "Create Task" / "Save Changes" button
function saveTask() {
    const data = readForm();
    const errors = validateTask(data);

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    if (editingId === null) {
        tasks.push(createTask(data, nextId));
        nextId++;
    } else {
        const index = tasks.findIndex(t => t.id === editingId);
        tasks[index] = createTask(data, editingId);
    }

    closeTaskForm();
    renderAll();
}


// ---------- Task actions ----------

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    editingId = id;
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskMember').value = task.member;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskDeadline').value = task.deadline;
    document.getElementById('taskStatus').value = task.status;

    document.getElementById('taskFormTitle').textContent = 'Edit Task';
    document.getElementById('saveTaskBtn').textContent = 'Save Changes';
    document.getElementById('taskForm').classList.remove('hidden');
    document.getElementById('taskForm').scrollIntoView({ behavior: 'smooth' });
}

function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    tasks = tasks.filter(t => t.id !== id);
    renderAll();
}

function changeStatus(id, newStatus) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    task.status = newStatus;
    renderAll();
}


// ---------- Rendering ----------

function renderAll() {
    renderStats();
    renderTaskList();
    renderTeam();
}

function renderStats() {
    const stats = computeStats(tasks);
    document.getElementById('totalTasks').textContent = stats.total;
    document.getElementById('completedTasks').textContent = stats.completed;
    document.getElementById('progressTasks').textContent = stats.inProgress;
    document.getElementById('todoTasks').textContent = stats.todo;
}

function renderTaskList() {
    const list = document.getElementById('taskList');

    const visible = filterTasks(tasks, {
        search: document.getElementById('searchInput').value,
        status: document.getElementById('filterStatus').value,
        priority: document.getElementById('filterPriority').value
    });

    if (tasks.length === 0) {
        list.innerHTML = '<p>No tasks available.</p>';
        return;
    }
    if (visible.length === 0) {
        list.innerHTML = '<p>No tasks match your search or filters.</p>';
        return;
    }

    list.innerHTML = visible.map(function(task) {
        const statusOptions = STATUSES.map(function(s) {
            const selected = s === task.status ? 'selected' : '';
            return '<option ' + selected + '>' + s + '</option>';
        }).join('');

        return `
            <div class="task-card">
                <h3>${escapeHtml(task.name)}</h3>
                <p>${escapeHtml(task.description)}</p>
                <p><strong>Assigned to:</strong> ${escapeHtml(task.member)}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
                <p><strong>Deadline:</strong> ${task.deadline}</p>
                <p>
                    <strong>Status:</strong>
                    <select onchange="changeStatus(${task.id}, this.value)">
                        ${statusOptions}
                    </select>
                </p>
                <div class="task-actions">
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button class="cancel-btn" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderTeam() {
    document.getElementById('member1Tasks').textContent =
        countTasksByMember(tasks, 'Member 1');
    document.getElementById('member2Tasks').textContent =
        countTasksByMember(tasks, 'Member 2');
}

// Prevents user-typed text from being interpreted as HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


// Start the app
renderAll();