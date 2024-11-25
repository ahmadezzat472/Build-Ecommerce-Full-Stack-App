import Cookies, { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies()

class CookieService {
    get(nameOfCookie: string){
        return cookies.get(nameOfCookie);
    }

    set(nameOfCookie: string, valueOfCookie: unknown, options: CookieSetOptions){
        return cookies.set(nameOfCookie, valueOfCookie, options);
    }

    remove(nameOfCookie: string){
        return cookies.remove(nameOfCookie);
    }
}

export default new CookieService();