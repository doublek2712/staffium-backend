class CreateStaffDTO {
  constructor({
    organization_id,
    first_name,
    last_name,
    gender,
    nationality,
    birthdate,
    birthplace,
    place_of_residence,
    citizen_id,
    phone,
    email,
    date_of_contract,
    contract_end_date,
    contract,
    department,
    position
  }) {
    this.organization_id = organization_id
    this.first_name = first_name
    this.last_name = last_name
    this.gender = gender
    this.nationality = nationality
    this.birthdate = birthdate
    this.birthplace = birthplace
    this.place_of_residence = place_of_residence
    this.citizen_id = citizen_id
    this.phone = phone
    this.email = email
    this.date_of_contract = date_of_contract
    this.contract_end_date = contract_end_date
    this.contract = contract
    this.department = department
    this.position = position
  }
}

module.exports = CreateStaffDTO