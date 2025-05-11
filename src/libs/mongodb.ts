import { MongoClient } from "mongodb"

const uri: string = process.env.MONGODB_URI as string
const options: object = {}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local")
}

// Extend globalThis to support custom Mongo client
declare global {
  // allow global `var` definitions
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
