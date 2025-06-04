import PouchDB from 'pouchdb-browser';

const userDB = new PouchDB('users');

/**
 * Seed a default admin user if none exists.
 * Passwords are stored in plain text only for the demo!  ─────────────►
 * In production hash with bcryptjs or similar.
 */
export const initUsers = async () => {
  try {
    await userDB.get('admin');
  } catch (err) {
    if (err.status === 404) {
      await userDB.put({
        _id: 'admin',
        username: 'admin',
        password: 'admin123',
        "role" : 'admin',
      });
      console.log('✅  Seeded default admin user (admin/admin123)');
    }
  }
};

export default userDB;
