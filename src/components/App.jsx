import React, { useState, useEffect } from "react";
import Form from "./Form/Form";
import Section from "components/Section/Section";
import ContactList from "./ContactsList/ContactsList";
import Filter from "./Filter/Filter";
import { nanoid } from "nanoid";

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem("contacts")) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ] || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsLocalStor = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsLocalStor);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(contacts => {
      if (contacts.some(contact => contact.name === name)) {
        alert(`${name} is already in contacts!`);
        return contacts;
      }
      return [contact, ...contacts];
    });
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId),
    );
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
}