const ContacstRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContacstRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    // Obter UM REGISTRO
    const { id } = request.params;
    const contact = await ContacstRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.json(contact);
  }

  async store(request, response) {
    // Criar novo registro
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }

    const contactExists = await ContacstRepository.findByEmail(email);

    if (contactExists) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already been taken.' });
    }

    const contact = await ContacstRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    return response.status(200).json(contact);
  }

  async update(request, response) {
    // Atualizar um registro

    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContacstRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found.' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required.' });
    }
    const contactByEmail = await ContacstRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already been taken.' });
    }

    const contact = await ContacstRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    return response.status(200).json(contact);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await ContacstRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new ContactController();
