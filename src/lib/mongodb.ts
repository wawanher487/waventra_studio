import mongoose from "mongoose";

//deklarasi global
declare global {
    var mongoose: {conn: unknown; promise: unknown} | undefined;
}

//membuat variabel untuk url database
const MONGODB_URI = process.env.MONGODB_URI!

//membuat variabel cached
let cached = global.mongoose as {conn: unknown; promise: unknown}

//jika tidak ada data di cached
if(!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}


//function cennection database 
export async function connectionToDatabase(){
    //kalau sudah ada koneksi 
    if(cached.conn){
        return cached.conn;
    }

    //kalau belum ada koneksi 
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

