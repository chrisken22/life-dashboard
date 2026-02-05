import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { tasksApi } from '../services/api';

/**
 * Kanban Board Component
 *
 * Features:
 * - Three columns: Backlog | In Progress | Done
 * - Drag-and-drop between columns (react-beautiful-dnd)
 * - Cards show: title, description, due date, priority, tags
 * - Add, Edit, Delete tasks
 */
function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalStatus, setModalStatus] = useState('backlog');

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await tasksApi.getAll();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Group tasks by status
  const tasksByStatus = {
    backlog: tasks.filter(t => t.status === 'backlog'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    done: tasks.filter(t => t.status === 'done'),
  };

  // Handle drag end
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskId = parseInt(draggableId);
    const newStatus = destination.droppableId;

    // Optimistic update
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      await tasksApi.updateStatus(taskId, newStatus);
    } catch (err) {
      console.error('Failed to update task status:', err);
      loadTasks();
    }
  };

  // Open modal for new task
  const openNewTaskModal = (status) => {
    setEditingTask(null);
    setModalStatus(status);
    setShowModal(true);
  };

  // Open modal for editing task
  const openEditModal = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  // Delete task
  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await tasksApi.delete(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
      alert('Failed to delete task');
    }
  };

  // Save task (create or update)
  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        // Update existing task
        const updated = await tasksApi.update(editingTask.id, taskData);
        setTasks(tasks.map(t => t.id === editingTask.id ? updated : t));
      } else {
        // Create new task
        const newTask = await tasksApi.create({ ...taskData, status: modalStatus });
        setTasks([...tasks, newTask]);
      }
      setShowModal(false);
    } catch (err) {
      console.error('Failed to save task:', err);
      alert('Failed to save task');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-dark-muted">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header with Refresh Button */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Kanban Board</h2>
          <p className="text-dark-muted mt-1">Drag tasks between columns to update status</p>
        </div>
        <button
          onClick={loadTasks}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          🔄 Refresh
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          <KanbanColumn
            title="Backlog"
            status="backlog"
            tasks={tasksByStatus.backlog}
            color="purple"
            onAddTask={() => openNewTaskModal('backlog')}
            onEditTask={openEditModal}
            onDeleteTask={handleDelete}
          />
          <KanbanColumn
            title="In Progress"
            status="in_progress"
            tasks={tasksByStatus.in_progress}
            color="blue"
            onAddTask={() => openNewTaskModal('in_progress')}
            onEditTask={openEditModal}
            onDeleteTask={handleDelete}
          />
          <KanbanColumn
            title="Done"
            status="done"
            tasks={tasksByStatus.done}
            color="green"
            onAddTask={() => openNewTaskModal('done')}
            onEditTask={openEditModal}
            onDeleteTask={handleDelete}
          />
        </div>
      </DragDropContext>

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => setShowModal(false)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}

// Column component
function KanbanColumn({ title, status, tasks, color, onAddTask, onEditTask, onDeleteTask }) {
  const colors = {
    purple: 'from-purple-600 to-purple-700',
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Column Header with Add Button */}
      <div className={`bg-gradient-to-r ${colors[color]} rounded-t-xl px-5 py-4 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <span className="bg-white bg-opacity-30 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {tasks.length}
            </span>
          </div>
          <button
            onClick={onAddTask}
            className="bg-white bg-opacity-30 hover:bg-opacity-40 text-white px-3 py-1 rounded-lg transition-colors font-semibold text-sm"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Column Body */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 bg-dark-card rounded-b-xl p-4 min-h-[500px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-opacity-80 ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onEdit={() => onEditTask(task)}
                  onDelete={() => onDeleteTask(task.id)}
                />
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

// Task card component
function TaskCard({ task, index, onEdit, onDelete }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group bg-dark-bg rounded-lg p-4 border border-dark-border transition-all duration-200 ${
            snapshot.isDragging
              ? 'shadow-2xl ring-2 ring-blue-500 scale-105 rotate-2'
              : 'hover:shadow-xl hover:border-blue-500 hover:-translate-y-1'
          } cursor-grab active:cursor-grabbing relative`}
        >
          {/* Delete Button (visible on hover) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-opacity"
          >
            ×
          </button>

          {/* Task Content - Click to Edit */}
          <div onClick={onEdit} className="cursor-pointer">
            {/* Task Title */}
            <h4 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors pr-8">
              {task.title}
            </h4>

            {/* Task Description */}
            {task.description && (
              <p className="text-sm text-dark-muted mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {task.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-500 bg-opacity-20 text-blue-400 px-2 py-1 rounded-md font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-dark-muted pt-3 border-t border-dark-border">
              {task.due_date ? (
                <span className="flex items-center gap-1">
                  📅 {new Date(task.due_date).toLocaleDateString()}
                </span>
              ) : (
                <span></span>
              )}
              {task.priority > 0 && (
                <span className="bg-red-500 bg-opacity-20 text-red-400 px-2 py-1 rounded font-medium">
                  High Priority
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

// Task Modal Component
function TaskModal({ task, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    tags: task?.tags?.join(', ') || '',
    due_date: task?.due_date ? task.due_date.split('T')[0] : '',
    priority: task?.priority || 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert date to ISO format if present
    let dueDate = null;
    if (formData.due_date && formData.due_date.trim() !== '') {
      // Add time component to make it a valid datetime
      dueDate = `${formData.due_date}T00:00:00`;
    }

    onSave({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      due_date: dueDate,
      priority: parseInt(formData.priority),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-dark-card rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-white mb-4">
          {task ? 'Edit Task' : 'New Task'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-1">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter description"
              rows="3"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="bug, urgent, feature"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-1">Due Date</label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-1">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="0">Normal</option>
              <option value="1">High</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-dark-bg hover:bg-opacity-80 border border-dark-border text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
            >
              {task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default KanbanBoard;
