import {URL_AVATAR_GIF, URL_AVATAR_IMAGE} from './constants.util';

class AvatarUtil {
  generateAvatarImageUrlWithPreventCache(user: string): string {
    return `${URL_AVATAR_IMAGE}${user}.png?time=${new Date().getTime()}`;
  }
  generateAvatarGifUrlWithPreventCache(user: string): string {
    return `${URL_AVATAR_GIF}${user}.png?time=${new Date().getTime()}`;
  }
}
export default new AvatarUtil();
