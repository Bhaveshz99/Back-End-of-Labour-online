import models from "../models/index";
import jwt from "jsonwebtoken";


export const connectSocketServer = async (server: any) => {

    const io = require("socket.io")(server, { cors: { origin: "*" } });

    io.use((socket: any, next: any) => {
        try {
            const token = socket?.handshake?.auth?.token;

            jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'manOnline8080', async (err: any, decoded: any) => {
                if (err) console.log("error", err.message);
                await models?.User.findOne({ _id: decoded?._id, isDeleted: false }).then((result: any) => {
                    if (result) {
                        socket.me = result;
                        next();
                    } else {
                        io.sockets.to(socket.id).emit("auth", { message: "user not found" })
                    }
                }).catch((error: any) => {
                    io.sockets.to(socket.id).emit("auth", { message: "user not found" })
                })
            });
        } catch (error: any) {
            console.log(error.message);
        }
    });

    io.on("connection", async (socket: any) => {
        const { _id }: any = socket?.me;
        await models?.User.findOneAndUpdate({ _id }, { socketId: socket.id }, { new: true })

        socket.emit('sendRequest', { data: 'Send data successFully' })

        socket.on('getResult', (data: any) => {
            console.log("🚀 ~ file: socket.ts:38 ~ socket.on ~ data", data)
        })

    });

    io.on("disconnect", async (socket: any) => {
        await models?.User.findOne({})
        console.log(socket.id);
    });

}

export default { connectSocketServer }