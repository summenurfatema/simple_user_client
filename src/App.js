
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email }

    console.log(user)

    fetch('http://localhost:8080/users', {

      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)

    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUsers = [...users, data]
        setUsers(newUsers)
      })
      .catch(err => console.log(err))

    // user : dbuser01
    // pass : 

  }
  return (
    <div>
      <h2>{users.length}</h2>
      <div>
        {
          users.map(user => <p key={user.id}>{user.name}</p>)
        }
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' />
        <br></br>
        <input type="email" name='email' />
        <br></br>
        <button type='submit'>Sumbit</button>

      </form>
    </div>
  );
}

export default App;
