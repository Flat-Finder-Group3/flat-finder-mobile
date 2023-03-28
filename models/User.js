class User {
  id;
  name;
  email;
  avatar_url;
  last_sign_in_at;
  is_admin;
  // message_inbox;

  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.avatar_url = user.avatar_url;
    this.last_sign_in_at = user.last_sign_in_at;
    this.is_admin = user.is_admin;
    // this.message_inbox = user.message_inbox
  }
}

const emptyUser = {
  id: null,
  name: null,
  email: null,
  avatar_url: null,
  last_sign_in_at: null,
  is_admin: false,
};

export { User, emptyUser };
