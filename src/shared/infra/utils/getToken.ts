export function getToken (authorizationHeader = '') {
  if (!authorizationHeader) return null
  const splittedHeader = authorizationHeader.split('Bearer')
  if (!splittedHeader[1]) return null
  return splittedHeader[1].trim()
}
