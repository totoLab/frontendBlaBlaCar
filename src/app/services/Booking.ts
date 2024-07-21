import { User } from './User'
import { Ad } from './Ad'

export interface Booking {
    user: User;
    ad: Ad;
}