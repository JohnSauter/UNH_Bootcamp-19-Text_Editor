import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

/* Get one item from the database.  */
export const getDb = async (id) => {
  console.log("GET one item from the jake database.");
  const jate_DB = await openDB("jate", 1);
  const tx = jate_DB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(id);
  const result = await request;
  console.log("result.value", result);
  return result;
};

// TODO: Add logic to a method that accepts some content and 
// adds it to the database
export const addDb = async (content) => {
  console.log("ADD one item to the jate database.");
  const jate_DB = await openDB("jate", 1);
  const tx = jate_DB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.add({ content });
  const result = await request;
  console.log("🚀 - data added to the jate database.", result);
};

/* Modify one item in the database.  */
export const putDb = async (id, content) => {
  console.log("PUT to the jate database.");
  const jate_DB = await openDB("jate", 1);
  const tx = jate_DB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: id, text: content });
  const result = await request;
  console.log("🚀 - data saved to the jate database.", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getAllDb = async () => {
  console.log("GET all from the jate database.");
  const jate_DB = await openDB("jate", 1);
  const tx = jate_DB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
