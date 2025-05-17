import { useEffect, useState } from 'react'
import { Paper, Typography, IconButton } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'

function ViewContacts() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    // TODO: Replace with API GET to fetch contacts of the logged-in user
    const dummyContacts = [
      {
        _id: uuidv4(),
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '555-123-4567',
      },
      {
        _id: uuidv4(),
        name: 'Bob Williams',
        email: 'bob@example.com',
        phone: '555-987-6543',
      },
    ]
    setContacts(dummyContacts)
  }, [])

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <Typography variant="h4" className="mb-6">
        Your Contacts
      </Typography>

      {contacts.length === 0 ? (
        <Typography>No contacts to show.</Typography>
      ) : (
        <div className="space-y-4 w-full max-w-2xl">
          {contacts.map((contact) => (
            <Paper
              key={contact._id}
              className="p-4 flex justify-between items-center"
              elevation={2}
            >
              <div>
                <Typography className="font-semibold">{contact.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  📧 {contact.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  📞 {contact.phone}
                </Typography>
              </div>
              {/* Optional: add edit/delete buttons here if you want */}
            </Paper>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewContacts
