import { useState, useEffect } from 'react'
import { Paper, Typography, Button, TextField, IconButton } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid' // for dummy contact IDs
import { Link } from 'react-router-dom'
import { apiRequest } from '../config/apiRequest'
import { Endpoints } from '../config/EndPoints'

function Contacts() {
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [editingId, setEditingId] = useState(null)

 

 const handleSubmit = async (e) => {
  e.preventDefault();

  const contactData = {
    contactName: name,  // backend expects this key, not 'name'
    email,
    phone,
  };

  try {
    if (editingId) {
      // PUT request to update contact
    
      const updatedContact = await apiRequest(Endpoints.UPDATECONTACTS(editingId), contactData);

      setContacts((prev) =>
        prev.map((c) => (c._id === editingId ? updatedContact : c))
      );
      setEditingId(null);
    } else {
      // POST request to create new contact
      const createdContact = await apiRequest(Endpoints.CREATECONTACT, contactData);

      setContacts((prev) => [...prev, createdContact]);
    }

    // Clear form after success
    setName('');
    setEmail('');
    setPhone('');
  } catch (error) {
    console.error('Failed to save contact:', error);
    // Optionally set an error state here for UI feedback
  }
};


  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <Paper elevation={3} className="p-6 w-full max-w-xl">
        <Typography variant="h5" className="mb-4 text-center">
          Contact Manager
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
