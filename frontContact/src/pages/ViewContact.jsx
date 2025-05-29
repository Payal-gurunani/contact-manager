import { useEffect, useState } from 'react'
import { Paper, Typography, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { apiRequest } from '../config/apiRequest'
import { Endpoints } from '../config/EndPoints'

function ViewContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // For editing
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editContact, setEditContact] = useState({contactName: '', email: '', phone: '' })

  useEffect(() => {
    (async () => {
      try {
        const response = await apiRequest(Endpoints.CONTACTS)
        setContacts(response.data || []) // adjust this if apiRequest returns response.data
      } catch (err) {
        console.error('Failed to fetch contacts:', err)
        setError('No Contacts available')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleDelete = async (id) => {
    try {
      await apiRequest(Endpoints.DELETECONTACT(id))
      setContacts((prev) => prev.filter((c) => c._id !== id))
    } catch (err) {
      console.error('Delete failed:', err)
      setError('Failed to delete contact. Please try again.')
    }
  }

  const openEditDialog = (contact) => {
    setEditContact(contact)
    setEditDialogOpen(true)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditContact((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSubmit = async () => {
  try {
    const updated = await apiRequest(Endpoints.UPDATECONTACTS(editContact._id), {
      contactName: editContact.contactName,
      email: editContact.email,
      phone: editContact.phone,
    });
   
    setContacts((prev) =>
      prev.map((c) => (c._id === editContact._id ? updated.data : c))
    );
    setEditDialogOpen(false);
  } catch (err) {
    console.error('Update failed:', err);
    setError('Failed to update contact. Please try again.');
  }
}


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography>Loading contacts...</Typography>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography color="error">{error}</Typography>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <Typography variant="h4" className="mb-6">
        Your Contacts
      </Typography>

      {contacts.length === 0 ? (
        <Typography>No contacts to show.</Typography>
      ) : (
        <div className="space-y-4 w-full max-w-2xl">
          {contacts.map((contact,idx) => (

            <Paper
              key={contact._id??idx}
              className="p-4 flex justify-between items-center"
              elevation={2}
            >
              <div>
                <Typography className="font-semibold">{contact.contactName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  📧 {contact.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  📞 {contact.phone}
                </Typography>
              </div>

              <div>
                <IconButton color="primary" aria-label="edit contact" onClick={() => openEditDialog(contact)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" aria-label="delete contact" onClick={() => handleDelete(contact._id)}>
                  <Delete />
                </IconButton>
              </div>
            </Paper>
          ))}
        </div>
      )}

      {/* Edit Contact Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField
            label="Name"
            name="contactName"
            value={editContact.contactName}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={editContact.email}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={editContact.phone}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ViewContacts
