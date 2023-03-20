const { v4 } = require('uuid');
const db = require('../../database');

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
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(
      `SELECT * FROM contacts ORDER BY name ${direction}`
    );
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id=$1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email=$1', [
      email,
    ]);
    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(
      `INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4) RETURNING *`,
      [name, email, phone, category_id]
    );

    return row;
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
