
export default (str) => {
  if (!str) {
    return str
  }
  return JSON.stringify(str).replace(/^"|"$/g, '')
}
