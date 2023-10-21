import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = data => {
    const isExist = this.state.contacts.some(
      contact => contact.name === data.name
    );

    if (isExist) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    const finalContact = {
      ...data,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, finalContact],
    }));
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    const lowerWords = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerWords)
    );
  };

  filterContacts = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  handleDelete = contacId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contacId),
    }));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter value={this.filter} filterContacts={this.filterContacts} />
        <ContactList
          contacts={this.getContacts()}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
