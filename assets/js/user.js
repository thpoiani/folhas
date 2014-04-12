function User(name, email, password, persist) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.persist = persist || false;
  this._isValid = true;
  this._errors = [];
}

User.prototype.isValid = function (field) {
  this._validate(field);

  return this._isValid;
};

User.prototype.getErrors = function () {
  return this._errors;
};

User.prototype._validate = function (field) {
  var name = this.name,
    email = this.email,
    password = this.password;

  switch (field) {
    case 'name' :
      this._validateName(name);
      break;

    case 'email' :
      this._validateEmail(email);
      break;

    case 'password':
      this._validatePassword(password);
      break;

    case 'persist': return;

    default:
      this._validateName(name);
      this._validateEmail(email);
      this._validatePassword(password);
  }

  return this._isValid;
};

User.prototype._validateName = function (value) {
  value = value || '';

  if (!value.length || value.length > 80) {
    this._isValid = false;
    this._errors.push('name');
  }
};

User.prototype._validateEmail = function (value) {
  value = value || '';

  /**
   * badsyntax / email_validation.js
   * https://gist.github.com/badsyntax/719800
   */
  function isEmail(email) {
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
  }

  if (!value.length || value.length > 254 || !isEmail(value)) {
    this._isValid = false;
    this._errors.push('email');
  }
};

User.prototype._validatePassword = function (value) {
  value = value || '';

  if (!value.length || value.length < 4) {
    this._isValid = false;
    this._errors.push('password');
  }
};
