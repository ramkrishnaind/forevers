const dbName = "advertisementDB";
var db;
//open the db, the db is created if not exist already
//Specify DB name and version, update the version number if the DB structure need to be modified
if (window?.indexedDB) {
  var request = indexedDB.open(dbName, 2);

  //Error Handler
  request.onerror = function (event) {
    console.log("error: ");
  };

  //Success Handler
  request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
  };
  //Handler invoked on successful opening of database
  //Upgrade the existing DB object if the version is different or create the objects
  request.onupgradeneeded = function (event) {
    var db = event.target.result;

    // autoIncrement: true
    //Create Object store with primary key
    var objectStore = db.createObjectStore("advertisement", { keyPath: "id" });

    //Define the required Indexes
    objectStore.createIndex("top", "top", { unique: false });
    objectStore.createIndex("bottom", "bottom", { unique: true });

    //Add data to the object
    // customerData.forEach(function (advertisement) {
    //   objectStore.add(advertisement);
    // });
  };
}
export function addData(top, bottom) {
  const prom = new Promise((resolve, reject) => {
    if (!window?.indexedDB) reject(null);
    //Retrieve the transaction for specific object, specify the mode - readonly, readwrite and versionchange
    var transaction = db.transaction(["advertisement"], "readwrite");

    // Handler Invoked when all the data is added to the database.
    transaction.oncomplete = function (event) {
      console.log("Add Completed!");
    };

    //Error Handler
    transaction.onerror = function (event) {
      reject(event);
    };

    const customerDataNew = [{ id: "id1", top, bottom }];

    //Add new customer data to the store
    var objectStore = transaction.objectStore("advertisement");
    customerDataNew.forEach(function (advertisement, index) {
      var request = objectStore.add(advertisement);
      request.onsuccess = function (event) {
        console.log("Data Added..." + event.target.result);
        if (index === customerDataNew.length - 1) {
          resolve(event.target.result);
        }
      };
    });
  });
  return prom;
}
//Delete data from the store through primary key and delete method
export async function deleteData() {
  const prom = new Promise((resolve, reject) => {
    if (!window?.indexedDB) reject(null);
    var request = db
      .transaction(["advertisement"], "readwrite")
      .objectStore("advertisement")
      .delete("id1");
    request.onsuccess = function (event) {
      console.log("Record Deleted!");
      resolve(request.result);
    };
    request.onerror = function (event) {
      // Handle errors!
      reject(event);
    };
  });
  return prom;
}

//Read data from the store through primary key and get method
export async function readData() {
  const prom = new Promise((resolve, reject) => {
    if (!window?.indexedDB) reject(null);
    var transaction = db.transaction(["advertisement"]);
    var objectStore = transaction.objectStore("advertisement");
    var request = objectStore.get("id1");
    request.onerror = function (event) {
      // Handle errors!
      reject(event);
    };
    request.onsuccess = function (event) {
      resolve(request.result);
      // document.getElementById("data").innerHTML = "Name for SSN 444-44-4444 is " + request.result.name;
    };
  });
  return prom;
}

export async function isData() {
  const prom = new Promise((resolve, reject) => {
    if (!window?.indexedDB) reject(null);
    var transaction = db.transaction(["advertisement"]);
    var objectStore = transaction.objectStore("advertisement");
    var request = objectStore.get("id1");
    request.onerror = function (event) {
      // Handle errors!
      resolve(false);
    };
    request.onsuccess = function (event) {
      resolve(request.result);
      // document.getElementById("data").innerHTML = "Name for SSN 444-44-4444 is " + request.result.name;
    };
  });
  return prom;
}
//Update existing data through primary key and put method
export async function updateData(top, bottom) {
  var objectStore = db
    .transaction(["advertisement"], "readwrite")
    .objectStore("advertisement");
  var request = objectStore.get("id1");
  request.onerror = function (event) {};
  request.onsuccess = function (event) {
    //Get the current data
    var data = event.target.result;

    // update the value
    data.top = top;
    data.bottom = bottom;

    // Put the updated object to store.
    var requestUpdate = objectStore.put(data);
    requestUpdate.onerror = function (event) {
      // error
    };
    requestUpdate.onsuccess = function (event) {
      console.log("Success - the data is updated!");
    };
  };
}
