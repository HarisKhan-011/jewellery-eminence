const bcrypt = require("bcryptjs");

const admins = [
  {
    name: "Eminence Super Admin",
    image: "/assets/img/logo/eminence-mark-v2.png",
    email: "admin@eminencejewellery.com",
    password: bcrypt.hashSync("123456"),
    phone: "+92-300-111-2222",
    role: "Super Admin",
    joiningDate: new Date(),
  },
  {
    name: "Eminence Store Manager",
    image: "/assets/img/logo/eminence-mark-v2.png",
    email: "manager@eminencejewellery.com",
    password: bcrypt.hashSync("123456"),
    phone: "+92-300-333-4444",
    role: "Manager",
    joiningDate: new Date(),
  },
  {
    name: "Eminence Catalogue Admin",
    image: "/assets/img/logo/eminence-mark-v2.png",
    email: "catalogue@eminencejewellery.com",
    password: bcrypt.hashSync("123456"),
    phone: "+92-300-555-6666",
    role: "Admin",
    joiningDate: new Date(),
  },
];

module.exports = admins;
