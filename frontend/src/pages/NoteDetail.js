import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    api.get(`/notes/${id}`)
      .then(res => setNote(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const buy = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please login to buy');

      const res = await api.post(`/payment/create-order/${id}`);
      const { order } = res.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: 'Notes Marketplace',
        description: `Buy: ${note.title}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            alert('Payment successful. You can now download the note.');
          } catch (err) {
            alert('Payment verification failed');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating order');
    }
  };

  const download = async () => {
    try {
      // We'll try to open direct URL if allowed; else backend will redirect (we use blob to force download)
      const res = await api.get(`/notes/download/${id}`, { responseType: 'blob' });
      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = note.title + '.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert(err.response?.data?.message || 'Cannot download - maybe you have not purchased it.');
    }
  };

  if (!note) return <div>Loading...</div>;
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.subject}</p>
      <p>{note.description}</p>
      <p>Price: ₹{note.price}</p>

      {user && user.id === note.uploadedBy?._id ? (
        <a href={note.fileUrl} target="_blank" rel="noreferrer">View file</a>
      ) : (
        <>
          <button onClick={buy}>Buy for ₹{note.price}</button>
          <button onClick={download}>Download (after purchase)</button>
        </>
      )}
    </div>
  );
}
