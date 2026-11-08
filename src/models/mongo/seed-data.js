export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  shops: {
    _model: "Shop",
    goldenDiscs: {
      title: "Golden Discs",
      userid: "->users.bart"
    },
  luca: {
    title: "Luca Records",
    userid: "->users.marge"
  },
  southeast: {
    title: "Southeast Records",
    userid: "->users.homer"
  },
  hobbyhorse: {
    title: "Hobby Horse Records",
    userid: "->users.bart"
  },
  },
  infos: {
    _model: "Info",
    info_1: {
      address: "12 Main Street",
      county: "Wexford",
      vinylRarity: "Common/Recently Released",
      shopid: "->shops.goldenDiscs"
    },
  info_2: {
    address: "Main Street",
    county: "Waterford",
    vinylRarity: "Uncommon/Local Bands",
    shopid: "->shops.luca"
  },
  info_3: {
    address: "Eclectic Avenue",
  county: "Wexford",
  vinylRarity: "Rare",
  shopid: "->shops.hobbyhorse"
},
  info_4: {
    address: "White Mill Road",
  county: "Wexford",
  vinylRarity: "Rare",
  shopid: "->shops.southeast"
},
},
};
