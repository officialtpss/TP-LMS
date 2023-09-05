
import { SECRET_KEY } from '@/config/config';
import * as CryptoJS from 'crypto-js';
import atob from 'atob';
import btoa from 'btoa';
export default class CryptoSecurityService {
    static encrypt(message: string): string {
        return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
    }

    static decrypt(message: string): string {
        const bytes = CryptoJS.AES.decrypt(message, SECRET_KEY);
        return bytes?.toString(CryptoJS.enc.Utf8);
    }

    static encrypAtob(message: string): string {
        return atob(atob(message));
    }

    static decryptDBLevel(message: string): string {
        return btoa(btoa(message));
    }
}
