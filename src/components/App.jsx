import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import { nanoid } from 'nanoid';
import Container from './Container';
import { AppStyled } from './App.styled';
import ContactList from './ContactList';

import Filter from './Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contact'));
    if (contacts?.length) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contact', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContacts = {
      name,
      number,
      id: nanoid(),
    };
    setContacts([...contacts, newContacts]);
  };
  const removeContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };
  const handleFilter = ({ target }) => setFilter(target.value);
  const getFilterContact = () => {
    if (!filter) {
      return contacts;
    }
    const filterValue = filter.toLowerCase();
    const filterContact = contacts.filter(({ name }) => {
      const nameValue = name.toLowerCase();
      return nameValue.includes(filterValue.trim());
    });
    return filterContact;
  };

  const filterContact = getFilterContact();
  return (
    <AppStyled>
      <Container title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Container>
      <div>
        <Container title="Contacts">
          <Filter onChange={handleFilter} value={filter} />
          <ContactList contacts={filterContact} removeContact={removeContact} />
        </Container>
      </div>
    </AppStyled>
  );
};
// }

export default App;
