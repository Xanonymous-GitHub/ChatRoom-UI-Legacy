export async function setJwtToLocalStorageWithExpire (jwtToken: string) {
  await localStorage.setItem('jwtToken', jwtToken)
  await localStorage.setItem('jwtTokenExpireTime', (Date.now() + 20 * 86400 * 1000).toString())
}

export async function getJwtTokenFromLocalStorage () {
  const currentUserJwtToken = await localStorage.getItem('jwtToken')
  const jwtExpireTime = await parseInt(localStorage.getItem('jwtTokenExpireTime')!)
  if (currentUserJwtToken) {
    try {
      if (jwtExpireTime && Date.now() < jwtExpireTime) {
        return currentUserJwtToken
      }
    } catch (e) {
      localStorage.removeItem('jwtToken')
    }
  }
}
