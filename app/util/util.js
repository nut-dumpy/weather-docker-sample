export const createQuery = data => Object.entries(data).map(([key, value]) => key + '=' + value).join('&')
