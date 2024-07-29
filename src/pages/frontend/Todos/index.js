import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button, Modal, Form, Input } from 'antd'

export default function Todos() {
  const users = JSON.parse(localStorage.getItem("users")) || []
  const { authState, setAuthState } = useAuth()

  const [state, setState] = useState({ updateTitle: "", updateDescription: "", updateStatus: "", updateLocation: "", id: "" });
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);


  const showModal = () => { setIsTodoModalOpen(true) };
  const handleOk = () => { setIsTodoModalOpen(false) };
  const handleCancel = () => { setIsTodoModalOpen(false) };

  const user = users.find(user => user.email === authState.user.email) || { todos: [] };

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault()

    const { updateTitle, updateDescription, updateStatus, updateLocation, id } = state

    let updatedTodos = user.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title: updateTitle,
          description: updateDescription,
          status: updateStatus,
          location: updateLocation
        };
      }
      return todo;
    });

    const updatedUser = { ...user, todos: updatedTodos };
    const updatedUsers = users.map(u => u.email === authState.user.email ? updatedUser : u);

    setAuthState({ ...authState, user: updatedUser });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("isAuthenticated", JSON.stringify('true'));
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setState({
      updateTitle: "",
      updateDescription: "",
      updateStatus: "",
      updateLocation: "",
      id: ""
    });
    setIsTodoModalOpen(false);
  };

  const handleUpdateClick = (todoId) => {
    const selectedTodo = user.todos.find(todo => todo.id === todoId);
    if (selectedTodo) {
      setState({
        updateTitle: selectedTodo.title,
        updateDescription: selectedTodo.description,
        updateStatus: selectedTodo.status,
        updateLocation: selectedTodo.location,
        id: selectedTodo.id
      });
      showModal();
    }
  };


  const handleDeleteClick = (todoId) => {
    const todoToDelete = user.todos.find(todo => todo.id === todoId);
    if (todoToDelete) {
      setTodoToDelete(todoToDelete);
      setDeleteModalVisible(true);
    }
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      let updatedTodos = user.todos.filter(todo => todo.id !== todoToDelete.id);

      const updatedUser = { ...user, todos: updatedTodos };
      const updatedUsers = users.map(u => u.email === authState.user.email ? updatedUser : u);

      setAuthState({ ...authState, user: updatedUser });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("isAuthenticated", JSON.stringify('true'));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    setDeleteModalVisible(false);
  };


  const generateTableRows = () => {
    if (!user.todos || user.todos.length === 0) {
      return <tr><td colSpan="12">No todos available</td></tr>
    }

    return user.todos.map((todo, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>{todo.status}</td>
        <td>{todo.dateCreated}</td>
        <td>{todo.location}</td>
        <td>
          <Button type="primary" className='me-1' onClick={() => handleUpdateClick(todo.id)}>
            Update
          </Button>
          <Button type='primary' danger className='mt-1' onClick={() => handleDeleteClick(todo.id)}>
            Delete
          </Button>
        </td>
      </tr>
    ));
  }

  const table = (
    <div className="table-responsive">
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Date Created</th>
            <th scope="col">Location</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {generateTableRows()}
        </tbody>
      </table>
    </div>
  );

  return (
    <main>
      <div className="container text-center">
        <div className="row">
          <div className="col my-3">
            <h1 className='text-white'>Todos</h1>
          </div>
        </div>
        <div className="row">
          <div className="col mb-3">
            <Link to='/frontend/add-todo' className='btn btn-outline-light'>Add Todo</Link>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {table}
          </div>
        </div>
        <div className="row">
          <div className="col mb-2">
            <Link to='/frontend/home' className='btn btn-outline-light'>Go To Home</Link>
          </div>
        </div>
      </div>

      {/* Update Todo Modal */}
      <Modal title="Update Todo" open={isTodoModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Save changes
          </Button>,
        ]}
      >
        <Form id='updateTodoForm' layout="vertical">
          <Form.Item label="Title" name="updateTitle" initialValue={state.updateTitle}>
            <Input name='updateTitle' value={state.updateTitle} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Description" name="updateDescription" initialValue={state.updateDescription}>
            <Input.TextArea name="updateDescription" value={state.updateDescription} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Status" name="updateStatus" initialValue={state.updateStatus}>
            <Input name='updateStatus' placeholder='completed/incomplete' value={state.updateStatus} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Location" name="updateLocation" initialValue={state.updateLocation}>
            <Input name='updateLocation' value={state.updateLocation} onChange={handleChange} />
          </Form.Item>
          <Input type="hidden" name="id" value={state.id} />
        </Form>
      </Modal>



      {/* Delete Todo Modal */}
      <Modal
        open={deleteModalVisible}
        title="Confirm Delete"
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={confirmDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this todo?</p>
      </Modal>

    </main>
  );
}
