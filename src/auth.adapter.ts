import { Socket } from "socket.io";
import { User, UserDocument } from "./_schemas/user.schema";

export interface CustomSocket extends Socket {
    user: UserDocument;
}