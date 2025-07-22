import contactsData from "@/services/mockData/contacts.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const contactService = {
  async getAll() {
    await delay(300)
    return [...contactsData]
  },

  async getById(id) {
    await delay(200)
    const contact = contactsData.find(c => c.Id === parseInt(id))
    if (!contact) {
      throw new Error("Contact not found")
    }
    return { ...contact }
  },

  async create(contactData) {
    await delay(400)
    const maxId = Math.max(...contactsData.map(c => c.Id))
    const newContact = {
      ...contactData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    }
    contactsData.push(newContact)
    return { ...newContact }
  },

  async update(id, updateData) {
    await delay(300)
    const index = contactsData.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Contact not found")
    }
    contactsData[index] = { ...contactsData[index], ...updateData }
    return { ...contactsData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = contactsData.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Contact not found")
    }
    const deleted = contactsData.splice(index, 1)[0]
    return { ...deleted }
  }
}