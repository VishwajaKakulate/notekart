import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [myNotes, setMyNotes] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) return;
    api.get('/notes')
      .then(res => {
        if (user.role === 'seller') {
          const uploaded = res.data.filter(n => n.uploadedBy && (n.uploadedBy._id === user.id || n.uploadedBy._id === user._id));
          setMyNotes(uploaded);
        } else {
          // For buyers: ideally fetch orders, but for now show none
          setMyNotes([]);
        }
      })
      .catch(err => console.error(err));
  }, [user]);

  if (!user) return <div>Please login</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <h3>My Uploaded Notes</h3>
      {myNotes.length === 0 && <p>No notes uploaded</p>}
      {myNotes.map(n => (
        <div key={n._id}>
          <Link to={`/note/${n._id}`}>{n.title}</Link>
        </div>
      ))}
    </div>
  );
}
