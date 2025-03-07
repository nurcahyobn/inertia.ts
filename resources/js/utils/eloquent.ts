export const get = <T extends { id: number }>(data: T[], id: number): T | undefined => {
  return data.find((item) => item.id === id)
}
