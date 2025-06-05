import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

const db = new PouchDB('emr_database');

// Optional sync setup (if CouchDB remote URL exists)
const remoteCouch = 'http://localhost:5984/emr_database'; // replace with actual URL if available

db.sync(remoteCouch, {
  live: true,
  retry: true,
}).on('change', info => {
  console.log('DB Sync Change:', info);
}).on('error', err => {
  console.error('DB Sync Error:', err);
});

export default db;
