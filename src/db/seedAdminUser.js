import userDB from './users';

export const seedAdminUser = async () => {
  try {
    const existing = await userDB.get('admin');
    console.log('Admin user already exists:', existing);
  } catch (err) {
    if (err.status === 404) {
      await userDB.put({
        _id: 'admin',
        username: 'admin',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created');
    } else {
      console.error('Error checking admin user:', err);
    }
  }
};
