import { Schema, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchmea = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
    //username aur password automatically created by passport local mongoose
});

userSchmea.plugin(passportLocalMongoose);
/*
It adds the following fields automatically to your schema:
{
  username: { type: String, unique: true },
  hash: String,
  salt: String
}
✅ username — The field used for login (by default).
✅ hash and salt — Automatically handled when a password is 
    set (no plain-text passwords are stored).
*/


const User = model("User", userSchmea);
export default User;



/*
// Add plugin with custom options
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'username',
  usernameLowerCase: true,
  usernameUnique: true,
  usernameValidator: function (username) {
    // Custom validation for username length
    return username.length >= 5 && username.length <= 15;
  }
});
*/


//registering a user
/*
import User from './models/user-model.js';

// Sample user registration
async function registerUser() {
  try {
    const newUser = new User({ email: 'test@example.com', username: 'tester123' });

    const registeredUser = await User.register(newUser, 'strongPassword123');
    console.log('User registered successfully:', registeredUser);
  } catch (err) {
    if (err.name === 'UserExistsError') {
      console.log('Username already exists!');
    } else {
      console.log('Error registering user:', err.message);
    }
  }
}

registerUser();

*/