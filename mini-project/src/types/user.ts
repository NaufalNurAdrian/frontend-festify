export interface IUser {
    user_id: number
    username: string
    email: string
    points: number
    avatar: string
    referralCode: string
    role: "CUSTOMER" | "ORGANIZER"
}