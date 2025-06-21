import PouchDB from 'pouchdb';

const appointmentDB = new PouchDB('appointments');
export default appointmentDB;
