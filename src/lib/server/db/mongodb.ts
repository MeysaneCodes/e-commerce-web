import {MongoClient, ServerApiVersion} from "mongodb";

let Client: MongoClient;
let ClientPromise: Promise<MongoClient> | undefined;

const uri = process.env.MONGODB_URI ?? "";
const Db_names= {
    testPurpose : process.env.MONGO_DB_TEST_PURPOSE,
    shop : "shop",
    admin : "admin"
}


//check if it exists
//makes sure it runs only once even if the class is being imported somewhere else
if(!global._mongoClientPromise){
    Client =  new MongoClient(uri,{
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    global._mongoClientPromise = Client.connect();
}

// eslint-disable-next-line prefer-const
ClientPromise = global._mongoClientPromise;


type props = {
    db_name: string;
    db_CLIENT: MongoClient;
}

async function Db_Diagnose ({db_name, db_CLIENT}: props): Promise<boolean | undefined> {

    const HealthCheck = await db_CLIENT.db(db_name).command({ping:1});
    return  HealthCheck.ok;
}

export async function getDB(dbName:string){



    try{
        const client = await ClientPromise;
        if (client){

            console.log("Connection to mongodb established");
            const Db_Health =  await Db_Diagnose({db_name:dbName, db_CLIENT: client});

            if(Db_Health)
                console.log("Health Check : Connection to mongodb is established");
            else
                console.log("Health Check: Connection to mongodb failed");


            return client.db(dbName);
        }

    }catch (e) {
        throw new Error(`${dbName} not found. Error: ` + e);
    }
}

