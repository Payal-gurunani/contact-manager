import { useState, useEffect } from 'react'
import { Paper, Typography, Button, TextField, IconButton } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid' // for dummy contact IDs
import { Link } from 'react-router-dom'

function Contacts() {
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    // TODO: Replace dummy data with API GET call
    // Example: const res = await axios.get('/api/contacts');
    const dummyContacts = [
      {
        _id: uuidv4(),
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
      },
      {
        _id: uuidv4(),
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '987-654-3210',
      },
    ]
    setContacts(dummyContacts)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newContact = {
      _id: editingId || uuidv4(),
      name,
      email,
      phone,
    }

    if (editingId) {
      // TODO: Replace with API PUT request
      // Example: await axios.put(`/api/contacts/${editingId}`, newContact)
      setContacts((prev) =>
        prev.map((c) => (c._id === editingId ? newContact : c))
      )
      setEditingId(null)
    } else {
      // TODO: Replace with API POST request
      // Example: await axios.post('/api/contacts', newContact)
      setContacts((prev) => [...prev, newContact])
    }

    setName('')
    setEmail('')
    setPhone('')
  }

  const handleDelete = (id) => {
    // TODO: Replace with API DELETE request
    // Example: await axios.delete(`/api/contacts/${id}`)
    setContacts((prev) => prev.filter((c) => c._id !== id))
  }

  const handleEdit = (contact) => {
    setName(contact.name)
    setEmail(contact.email)
    setPhone(contact.phone)
    setEditingId(contact._id)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <Paper elevation={3} className="p-6 w-full max-w-xl">
        <Typography variant="h5" className="mb-4 text-center">
          Contact Manager (Dummy Data)
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <TextField
            label="Contact Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Phone Number"
            type="tel"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {editingId ? 'Update Contact' : 'Add Contact'}
          </Button>
        </form>
<Button component={Link} to="/view-contacts" variant="outlined" color="primary" className="mt-4">
  View All Contacts
</Button>

       
      </Paper>
    </div>
  )
}

export default Contacts
