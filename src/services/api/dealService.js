import dealsData from "@/services/mockData/deals.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const dealService = {
  async getAll() {
    await delay(350)
    return [...dealsData]
  },

  async getById(id) {
    await delay(200)
    const deal = dealsData.find(d => d.Id === parseInt(id))
    if (!deal) {
      throw new Error("Deal not found")
    }
    return { ...deal }
  },

  async create(dealData) {
    await delay(400)
    const maxId = Math.max(...dealsData.map(d => d.Id))
    const newDeal = {
      ...dealData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    }
    dealsData.push(newDeal)
    return { ...newDeal }
  },

  async update(id, updateData) {
    await delay(300)
    const index = dealsData.findIndex(d => d.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Deal not found")
    }
    dealsData[index] = { ...dealsData[index], ...updateData }
    return { ...dealsData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = dealsData.findIndex(d => d.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Deal not found")
    }
    const deleted = dealsData.splice(index, 1)[0]
    return { ...deleted }
  }
}