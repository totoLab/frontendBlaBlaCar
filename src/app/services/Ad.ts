import { User } from "./User"

export interface Ad {
    id: number
    departureCity: string
    departureTime: Date
    arrivalCity: string
    arrivalTime: Date
    date: Date
    car: string
    twoBackSeats: boolean
    publisher: User
    
    isBooking: boolean
    isBooked: boolean
    isPublished: boolean
}