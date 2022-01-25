import './App.css';

import { useState } from 'react';

import contactsJson from './contacts.json';

function App() {
  const [contacts, setContacts] = useState(contactsJson.slice(0, 5));

  const addRandomContact = () => {
    // console.log('--- --- add random contact');
    const contactPool = contactsJson.slice(5);
    const contactsIds = contacts.map(el => el.id);
    let newContact;
    let randomIdx;
    do {
      randomIdx = Math.floor(Math.random() * contactPool.length);
      // console.log('contactPool[randomIdx] :>> ', contactPool[randomIdx]);
      newContact = contactPool[randomIdx];
    }
    while (contactsIds.includes(newContact.id))

    const bufferArr = [...contacts];
    bufferArr.push(contactPool[randomIdx]);
    setContacts(bufferArr);
  };
  
  // test with a function that takes an argument
  const sortBy = criteria => {
    const bufferArr = [...contacts];
    bufferArr.sort((a, b) => {
      if (criteria === 'name') {
        // console.log('name :>> ', a.name);
        if (a.name > b.name) return 1;
        else return -1;
      }
      else if (criteria === 'popularity') {
        return b.popularity - a.popularity;
      }
      else {
        return 0;
      }
    });
    setContacts(bufferArr);
  };

  // test with 1 dedicated function
  const sortByPopularity = () => {
    const bufferArr = [...contacts];
    // console.log('bufferArr :>> ', bufferArr);
    bufferArr.sort((a, b) => b.popularity - a.popularity);
    // console.log('bufferArr :>> ', bufferArr);
    setContacts(bufferArr);
  };

  const deleteContact = contactId => {
    const bufferArr = [...contacts];
    // remove (splice) the contactToDelete (find) that is found at index (indexOf)
    bufferArr.splice(bufferArr.indexOf(bufferArr.find(el => el.id === contactId)), 1);
    setContacts(bufferArr);
  }


  return (
    <div className="App">
      <h1>IronContacts</h1>

      <div className="buttons">
        <div className="add">
          <button onClick={addRandomContact}>Add Random Contact</button>
        </div>
        <div className="sort">
          <button onClick={() => sortByPopularity()}>Sort by Popularity</button>
          <button onClick={() => sortBy('name')}>Sort by Name</button>
        </div>
      </div>

      <div className="contacts">
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won an Oscar</th>
              <th>Won an Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => {
              return (
              <tr key={contact.id}>
                <td><img src={contact.pictureUrl} alt={contact.name} className='pic' /></td>
                <td className='left name'>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar && '🏆'}</td>
                <td>{contact.wonEmmy && '🏆'}</td>
                <td className='delete'><button onClick={() => deleteContact(contact.id)} className='delete'>Remove</button></td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
