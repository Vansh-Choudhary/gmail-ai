import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Emails() {
  const [emails, setEmails] = useState([]);
  const [numEmails, setNumEmails] = useState(10);
  const [loading, setLoading] = useState(true);
  const [classifying, setClassifying] = useState(false);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const router = useRouter();
  const { name, email } = router.query;

  useEffect(() => {
    if (!email) return;

    setLoading(true);
    setError(null);

    fetch(`/api/emails?limit=${numEmails}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setEmails(data.emails || []); // Default to empty array if data.emails is undefined
        setUserProfile(data.userProfile || {});
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching emails:', error);
        setError(error);
        setLoading(false);
      });
  }, [email, numEmails]);

  const handleClassify = () => {
    setClassifying(true);
    fetch('/api/classify-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emails }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmails(data.emails || []); // Default to empty array if data.emails is undefined
        setClassifying(false);
      })
      .catch((error) => {
        console.error('Error classifying emails:', error);
        setError(error);
        setClassifying(false);
      });
  };

  const handleLogout = () => {
    // Handle logout logic
    // For example, clearing cookies or tokens and redirecting to login page
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.push('/');
  };

  if (!email) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading emails...</div>;
  }

  if (error) {
    return <div>Error loading emails: {error.message}</div>;
  }

  return (
    <div className="container">
      {classifying && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <header className="header">
        <div className="profile">
          <img src={userProfile.picture} alt={name} className="profile-picture" />
          <div className="profile-info">
            <h2>{name}</h2>
            <p>{email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
        <div className="actions">
          <select
            value={numEmails}
            onChange={(e) => setNumEmails(e.target.value)}
            className="email-select"
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num} emails
              </option>
            ))}
          </select>
          <button onClick={handleClassify} className="classify-button">
            Classify
          </button>
        </div>
      </header>
      <div className="email-list">
        {emails.length > 0 ? (
          emails.map((email) => (
            <div key={email.id} className={`email ${email.category?.toLowerCase()}`}>
              <div className="category">{email.category}</div>
              <h2>{email.subject}</h2>
              <p>{email.snippet}</p>
            </div>
          ))
        ) : (
          <p>No emails found.</p>
        )}
      </div>
      <style jsx>{`
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
          position: relative;
        }
        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #0070f3;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .profile {
          display: flex;
          align-items: center;
        }
        .profile-picture {
          border-radius: 50%;
          margin-right: 15px;
          width: 55px;
          height: 55px;
        }
        .profile-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 1.2;
        }
        .profile-info h2 {
          margin: 0;
          font-size: 1.5em;
        }
        .profile-info p {
          margin: 0;
          color: gray;
        }
        .logout-button {
          margin-left: 20px;
          padding: 8px 12px;
          background-color: #ff4d4d;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .logout-button:hover {
          background-color: #e60000;
        }
        .actions {
          display: flex;
          align-items: center;
        }
        .email-select {
          margin-right: 10px;
          padding: 5px;
          border-radius: 5px;
          border: 1px solid #ddd;
        }
        .classify-button {
          padding: 8px 12px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .email-list {
          display: grid;
          gap: 15px;
        }
        .email {
          padding: 15px;
          border: 2px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        .email h2 {
          margin: 0 0 5px;
          font-size: 1.2em;
        }
        .category {
          position: absolute;
          top: 10px;
          right: 10px;
          font-weight: bold;
        }
        .important {
          border-color: green;
        }
        .important .category {
          color: green;
        }
        .promotional {
          border-color: blue;
        }
        .promotional .category {
          color: blue;
        }
        .social {
          border-color: purple;
        }
        .social .category {
          color: purple;
        }
        .marketing {
          border-color: orange.
        }
        .marketing .category {
          color: orange;
        }
        .spam {
          border-color: red.
        }
        .spam .category {
          color: red;
        }
      `}</style>
    </div>
  );
}
