const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Lucas Mateus',
    email: 'lucas@gmail.com',
    phone: '88999999999',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Laysla',
    email: 'laysla@gmail.com',
    phone: '88999999999',
    category_id: v4(),
  },
];

class ContacstRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  create({ name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const newContact = { id: v4(), name, email, phone, category_id };
      contacts.push(newContact);
      resolve();
    });
  }

  update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updatedContat = { id, name, email, phone, category_id };

      contacts = contacts.map((contact) =>
        contact.id === id ? updatedContat : contact
      );

      resolve(updatedContat);
    });
  }
}

module.exports = new ContacstRepository();
