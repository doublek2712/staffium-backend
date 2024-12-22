class CreateUserDTO {
  constructor({ username, password, roles }) {
    this.username = username
    this.password = password
    this.roles = roles
  }
}



module.exports = CreateUserDTO