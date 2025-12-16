export class server_messages_list{
    static ERROR = "Something went wrong";
    static DB_NAME_NOT_FOUND = "Something went wrong with Db, Please check env var";
    static DB_USER_NOT_FOUND = "Something went wrong with Db, Please check env var";
    static DB_CART_COLLECTION_NOT_FOUND = "Something went wrong with cart collection, Please check env var";
    static LOGGED_IN = "Logged in Successfully.";
}


export class session_messages_list extends server_messages_list{
    static NO_SESSION = "No session found!";
    static SESSION_FOUND = "Session found!";
}


export class checkout_messages_list extends server_messages_list{

    static NO_ITEM_FOUND_ON_CHECKOUT_CART = "No Item Found.";
    static NEW_ITEM_ADDED_TO_THE_CART = "New Item ADDED.";
}


export class mongo_db_operations_feedback extends server_messages_list{
    static UPDATING_DOC_SUCCEEDED = "Updating document succeeded"
    static UPDATING_DOC_FAILED = "Updating document failed";
    static DELETING_DOC_FAILED = "Deleting document failed";
    static GET_DOC_FAILED = "Getting document failed";
    static GET_DOC_SUCCESS = "Getting document succeeded";
    static NO_DOC_FOUND = "No document found.";
}