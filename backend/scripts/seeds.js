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
const FIRST_USERNAME = 'firstuser1'
const FIRST_ITEM_TITLE = 'firstitem1'

async function seedUsers() {
  for (let i = 0; i < NUM_USER; i++) {
    const user = new User();
    const username = i === 0 ? FIRST_USERNAME : crypto.randomUUID().replaceAll('-', '').substring(0, 20)
    const email = `${username.substring(0, 10)}@example.com`
    const password = '123456'

    user.username = username
    user.email = email;
    user.setPassword(password);

    await user.save()
  }
}

async function seedItems() {
  const user = await User.findOne({ username: FIRST_USERNAME })

  if (!user) {
    console.error("User cannot be found")
    return
  }

  for (let i = 0; i < NUM_ITEM; i++) {
    const text = crypto.randomUUID().replaceAll('-', '').substring(0, 20)
    const item = new Item({
      title: i === 0 ? FIRST_ITEM_TITLE : text,
      description: text,
    });

    item.seller = user;

    await item.save()
  }
}

async function seedComments() {
  const item = await Item.findOne({ title: FIRST_ITEM_TITLE })

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

    await comment.save()
  }

}

async function seedDB() {
  await seedUsers()
  await seedItems()
  await seedComments()

  mongoose.connection.close()
}

seedDB()