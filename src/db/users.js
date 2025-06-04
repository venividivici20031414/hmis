import PouchDB from 'pouchdb';

const userDB = new PouchDB('users'); // browser-side DB (IndexedDB)

export default userDB;
