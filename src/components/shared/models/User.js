/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.password = null;
    this.dateOfBirth = null;
    this.dateOfCeation = null;
    Object.assign(this, data);
  }
}
export default User;
