import activitiesData from "@/services/mockData/activities.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const activityService = {
  async getAll() {
    await delay(320)
    return [...activitiesData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  },

  async getById(id) {
    await delay(200)
    const activity = activitiesData.find(a => a.Id === parseInt(id))
    if (!activity) {
      throw new Error("Activity not found")
    }
    return { ...activity }
  },

  async create(activityData) {
    await delay(400)
    const maxId = Math.max(...activitiesData.map(a => a.Id))
    const newActivity = {
      ...activityData,
      Id: maxId + 1,
      timestamp: new Date().toISOString()
    }
    activitiesData.push(newActivity)
    return { ...newActivity }
  },

  async update(id, updateData) {
    await delay(300)
    const index = activitiesData.findIndex(a => a.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Activity not found")
    }
    activitiesData[index] = { ...activitiesData[index], ...updateData }
    return { ...activitiesData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = activitiesData.findIndex(a => a.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Activity not found")
    }
    const deleted = activitiesData.splice(index, 1)[0]
    return { ...deleted }
  }
}