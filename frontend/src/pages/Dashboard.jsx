import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { LogOut, Plus, Trash2, CheckCircle, Clock, LayoutDashboard, User } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', newTask);
      setTasks([...tasks, response.data.data]);
      setNewTask({ title: '', description: '', status: 'pending' });
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <div className="dashboard-container animate-fade-in">
      <nav className="navbar glass-card">
        <div className="nav-brand">
          <LayoutDashboard size={24} color="#6366f1" />
          <span>DevIntern API</span>
        </div>
        <div className="nav-user">
          <div className="user-info">
            <User size={18} />
            <span>{user?.username}</span>
            {user?.role === 'admin' && <span className="badge badge-admin">ADMIN</span>}
          </div>
          <button onClick={logout} className="btn btn-ghost btn-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <section className="task-creation glass-card">
          <h2>Add New Task</h2>
          <form onSubmit={createTask} className="task-form">
            <input 
              type="text" 
              className="input-field" 
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <textarea 
              className="input-field" 
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button type="submit" className="btn btn-primary">
              <Plus size={18} /> Add Task
            </button>
          </form>
        </section>

        <section className="task-list">
          <div className="list-header">
            <h2>Your Tasks</h2>
            <span className="count">{tasks.length} Total</span>
          </div>

          <div className="tasks-grid">
            {loading ? (
              <div className="loading">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="empty-state">No tasks found. Create one above!</div>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="task-card glass-card">
                  <div className="task-status">
                    {task.status === 'completed' ? (
                      <CheckCircle color="#10b981" />
                    ) : (
                      <Clock color="#f59e0b" />
                    )}
                  </div>
                  <div className="task-content">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    {user?.role === 'admin' && task.User && (
                       <small className="owner">Owner: {task.User.username}</small>
                    )}
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="delete-btn">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
