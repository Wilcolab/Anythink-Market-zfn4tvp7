const crypto = require('crypto');
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);

require("../models/User");
require("../models/Item");
require("../models/Comment");

const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

const NUM_USER = 100
const NUM_ITEM = 100
const NUM_COMMENT = 100
const FIRST_USER_ID = 'firstuser'
const FIRST_ITEM = 'firstitem'

function seedUsers() {
  for (let i = 0; i < NUM_USER; i++) {
    const user = new User();
    const username = i === 0 ? FIRST_USER_ID : crypto.randomUUID().replaceAll('-', '').substring(0, 20)
    const email = `${username.substring(0, 10)}@example.com`
    const password = '123456'

    user.username = username
    user.email = email;
    user.setPassword(password);

    user.save()
  }
}

function seedItems() {
  User.findById(FIRST_USER_ID)
    .then(function (user) {
      if (!user) {
        console.error("User cannot be found")
        return
      }

      for (let i = 0; i < NUM_ITEM; i++) {
        const text = crypto.randomUUID().replaceAll('-', '').substring(0, 20)
        const item = new Item({
          id: i === 0 ? FIRST_ITEM : undefined,
          title: text,
          description: text,
        });

        item.seller = user;

        item.save()
      }
    })
    .catch(err => console.error(err));
}

function seedComments() {
  Item.findById(FIRST_ITEM)
    .then(function (item) {
      if (!item) {
        console.error("Item cannot be found")
        return
      }

      for (let i = 0; i < NUM_COMMENT; i++) {
        const text = crypto.randomUUID().replaceAll('-', '').substring(0, 20)
        const comment = new Comment({
          body: text,
          seller: item.seller,
          item: item
        })

        comment.save()
      }
    })
    .catch(err => console.error(err));
}

function seedDB() {
  seedUsers()
  seedItems()
  seedComments()
}

seedDB()