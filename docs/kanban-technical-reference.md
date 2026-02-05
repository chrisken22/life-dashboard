# Kanban Board - Technical Reference

Quick reference for the Kanban board implementation. Use this when extending or debugging.

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│  KanbanBoard Component                          │
│  ├─ State: tasks[], loading, error             │
│  ├─ Effects: loadTasks() on mount              │
│  ├─ Handlers: onDragEnd, CRUD operations       │
│  └─ Renders:                                    │
│     ├─ DragDropContext                          │
│     └─ 3x KanbanColumn                          │
│        └─ Nx TaskCard                           │
│           └─ TaskModal (conditionally)          │
└─────────────────────────────────────────────────┘
         │
         ▼ API calls via services/api.js
┌─────────────────────────────────────────────────┐
│  FastAPI Backend                                │
│  ├─ GET /tasks/          → list all            │
│  ├─ POST /tasks/         → create              │
│  ├─ PUT /tasks/{id}      → update (full)       │
│  ├─ PATCH /tasks/{id}/status → update status   │
│  └─ DELETE /tasks/{id}   → delete              │
└─────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│  SQLite Database (compass.db)                   │
│  tasks table:                                   │
│    - id, title, description, status             │
│    - priority, due_date, tags (JSON)            │
│    - created_at, updated_at                     │
└─────────────────────────────────────────────────┘
```

---

## API Endpoints

### GET /tasks/
**Returns:** Array of all tasks
```json
[
  {
    "id": 1,
    "title": "Task title",
    "description": "Description text",
    "status": "backlog",
    "priority": 3,
    "due_date": "2026-02-10T00:00:00",
    "tags": ["bug", "urgent"],
    "created_at": "2026-02-06T12:00:00",
    "updated_at": "2026-02-06T12:00:00"
  }
]
```

### POST /tasks/
**Body:** TaskCreate schema (all fields except id/timestamps)
```json
{
  "title": "New task",
  "description": "Optional description",
  "status": "backlog",
  "priority": 0,
  "due_date": "2026-02-10T00:00:00",
  "tags": ["feature"]
}
```
**Returns:** Created task with id and timestamps

### PUT /tasks/{id}
**Body:** TaskUpdate schema (all fields optional)
```json
{
  "title": "Updated title",
  "status": "in_progress",
  "priority": 5
}
```
**Returns:** Updated task

### PATCH /tasks/{id}/status
**Body:** Just the status
```json
{
  "status": "done"
}
```
**Returns:** Updated task
**Use case:** Drag-and-drop status changes

### DELETE /tasks/{id}
**Returns:** Success message
```json
{
  "message": "Task deleted successfully"
}
```

---

## Frontend Component Structure

### KanbanBoard.jsx

**Main State:**
```javascript
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [showModal, setShowModal] = useState(false);
const [editingTask, setEditingTask] = useState(null);
const [newTaskStatus, setNewTaskStatus] = useState(null);
```

**Key Functions:**

#### loadTasks()
Fetches all tasks from API and updates state.
```javascript
const loadTasks = async () => {
  try {
    const data = await tasksApi.getAll();
    setTasks(data);
  } catch (err) {
    setError(err.message);
  }
};
```

#### onDragEnd(result)
Handles drag-and-drop with optimistic updates.
```javascript
// 1. Extract source/destination
// 2. Update local state immediately (optimistic)
// 3. Call PATCH /tasks/{id}/status to sync backend
// 4. Revert if API call fails
```

#### openNewTaskModal(status)
Opens modal for creating new task in specific column.
```javascript
setNewTaskStatus(status);  // backlog, in_progress, or done
setEditingTask(null);      // null = create mode
setShowModal(true);
```

#### openEditModal(task)
Opens modal with pre-filled task data.
```javascript
setEditingTask(task);     // task object = edit mode
setNewTaskStatus(null);
setShowModal(true);
```

#### handleSaveTask(taskData)
Creates or updates task based on mode.
```javascript
if (editingTask) {
  // Edit mode: PUT /tasks/{id}
  await tasksApi.update(editingTask.id, taskData);
} else {
  // Create mode: POST /tasks/
  await tasksApi.create({ ...taskData, status: newTaskStatus });
}
loadTasks();  // Refresh list
```

#### handleDelete(taskId)
Deletes task with confirmation.
```javascript
if (confirm('Delete this task?')) {
  await tasksApi.delete(taskId);
  loadTasks();
}
```

---

## TaskModal Component

**Props:**
- `task` - Task object (edit mode) or null (create mode)
- `status` - Initial status for new tasks (only used in create mode)
- `onClose` - Callback to close modal
- `onSave` - Callback with form data

**Form Fields:**
```javascript
{
  title: string,          // Required
  description: string,    // Optional
  tags: string,          // Comma-separated, converted to array
  due_date: string,      // YYYY-MM-DD from date picker
  priority: number       // 0-5
}
```

**Date Handling:**
```javascript
// Input: HTML date picker gives "YYYY-MM-DD"
// Convert to: "YYYY-MM-DDTHH:MM:SS" for backend
// Send as: null if empty, ISO string if provided
```

---

## Styling

### Column Header Gradients
```javascript
const gradients = {
  backlog: 'from-purple-600 to-purple-700',
  in_progress: 'from-blue-600 to-blue-700',
  done: 'from-green-600 to-green-700'
};
```

### Color Scheme (Tailwind Config)
```javascript
colors: {
  dark: {
    bg: '#1e293b',       // Main background
    card: '#334155',     // Card background
    border: '#475569',   // Borders
    text: '#f1f5f9',     // Primary text
    muted: '#94a3b8',    // Secondary text
  }
}
```

### Key Classes
- Cards: `bg-dark-card hover:bg-opacity-80 transition-all`
- Drag indicator: `ring-2 ring-blue-500 scale-105`
- Delete button: `opacity-0 group-hover:opacity-100 transition-opacity`

---

## Common Tasks

### Adding a New Field to Tasks

1. **Backend:** Update `app/models.py` to add column
2. **Backend:** Create Alembic migration (when we set it up)
3. **Backend:** Update `TaskBase` schema in `app/schemas.py`
4. **Frontend:** Add field to `TaskModal` form
5. **Frontend:** Update form submission in `handleSaveTask`

### Changing Task Statuses

Currently: `backlog`, `in_progress`, `done`

To add/remove statuses:
1. Update `COLUMNS` array in `KanbanBoard.jsx`
2. Update gradient mapping
3. Backend auto-accepts any status string (no validation currently)
4. Consider adding status enum validation in Pydantic schema

### Adding Filtering/Sorting

Implement in `KanbanBoard` before rendering columns:
```javascript
const filteredTasks = tasks.filter(/* your logic */);
const sortedTasks = filteredTasks.sort(/* your logic */);
// Then group by status for columns
```

### Adding Search

Option 1: Client-side filter (fast, simple)
```javascript
const [searchQuery, setSearchQuery] = useState('');
const filteredTasks = tasks.filter(t =>
  t.title.toLowerCase().includes(searchQuery.toLowerCase())
);
```

Option 2: Server-side (better for large datasets)
```javascript
GET /tasks?search=query
```

---

## Known Limitations

1. **No real-time updates** - Uses manual refresh button
   - Can add polling: `useEffect(() => { const timer = setInterval(loadTasks, 30000); }, [])`
2. **No undo/redo** - Deletions are permanent
   - Could implement soft delete (add `deleted` flag to DB)
3. **No task ordering** - Tasks appear in created order
   - Could add `position` field and custom sorting
4. **No subtasks** - Flat task structure only
   - Would need new `parent_task_id` field and nested rendering
5. **No file attachments** - Text only
   - Would need file upload endpoint and storage strategy

---

## Troubleshooting

### Drag-and-drop not working
- Check: Is `<React.StrictMode>` removed from `index.js`?
- Check: Console errors about "Unable to find draggable with id"?
- Fix: Remove StrictMode wrapper

### 422 errors on create/edit
- Check: Are date fields sending empty strings instead of null?
- Check: Are trailing slashes consistent? (Should NOT have trailing slash on PUT/DELETE)
- Check: Backend logs for validation errors

### Tasks not refreshing after edit
- Check: Is `loadTasks()` called after successful save?
- Check: Network tab - is API returning updated data?
- Try: Manual refresh button to verify API is working

### Modal not closing
- Check: Is `onClose` callback wired up correctly?
- Check: Is `showModal` state being set to false?

---

## Performance Notes

- **Current load:** 10-50 tasks works smoothly
- **Optimization point:** 100+ tasks → consider react-window for virtualization
- **API calls:** Currently fetches all tasks on every refresh
  - Future: Implement pagination or incremental loading
- **Render optimization:** Cards re-render on every state change
  - Future: Wrap TaskCard in React.memo() if needed

---

Last updated: 06/02/2026 01:00 from local
