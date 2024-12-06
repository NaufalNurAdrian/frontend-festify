export interface IUser {
    username: string
    email: string
    points: number
    avatar: string
    role: "Admin" | "User"
}