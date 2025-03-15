const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("이메일과 비밀번호를 모두 입력해 주세요.");
  }
  if (!validator.isEmail(email)) {
    throw Error("유효한 이메일이 아닙니다.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("비밀번호가 충분히 강력하지 않습니다. 대/소문자, 숫자, 특수문자를 모두 포함하고, 반복되는 문자를 줄이고 8자 이상으로 구성해 주세요.");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("이미 가입된 메일입니다.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("이메일과 비밀번호를 모두 입력해 주세요.");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("이메일을 다시 한번 확인해 주세요.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("비밀번호를 다시 한번 확인해 주세요.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
