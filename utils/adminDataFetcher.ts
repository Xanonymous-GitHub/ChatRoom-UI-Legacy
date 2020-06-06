import { appStore } from '~/utils/store-accessor'
import API from '~/api/api'
import { AdminType } from '~/store/types/appTypes'
import { getJwtTokenFromLocalStorage } from '~/utils/jwtTokenController'

export default async function (key?: string) {
  const token = key || appStore.getJwtKey || await getJwtTokenFromLocalStorage()
  if (token) {
    appStore.setCurrentUserJwtToken(token)
    const admin = (await API.getSpecifyAdminDataByJwtToken(token)) as unknown as AdminType
    if (!('error' in admin) && ('_id' in admin)) {
      await appStore.setCurrentUser(admin)
      return true
    }
  }
  return false
}
