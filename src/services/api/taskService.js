import tasksData from "@/services/mockData/tasks.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(280)
    return [...tasksData]
  },

  async getById(id) {
    await delay(200)
    const task = tasksData.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const maxId = Math.max(...tasksData.map(t => t.Id))
    const newTask = {
      ...taskData,
      Id: maxId + 1,
      status: "pending"
    }
    tasksData.push(newTask)
    return { ...newTask }
  },

  async update(id, updateData) {
    await delay(300)
    const index = tasksData.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    tasksData[index] = { ...tasksData[index], ...updateData }
    return { ...tasksData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = tasksData.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    const deleted = tasksData.splice(index, 1)[0]
    return { ...deleted }
  }
}