const sets = [
  {
    id: 1,
    brand: "Evah Golds",
    price: 128.31,
    gauge: "Medium",
    strings: "Set",
    rating: "★★★★★",
    date: "February 12, 2022",
    userNotes: "great set of strings",
  },
  {
    id: 2,
    brand: "Thomastik Dominant",
    price: 90.71,
    gauge: "Stark",
    strings: "Set",
    rating: "★★★★",
    date: "April 17, 2023",
    userNotes: "overall good, but not as much projection as I wanted",
  },
];

let globalId = 3;

module.exports = {
  getSets: (req, res) => res.status(200).send(sets),

  createNewSet: (req, res) => {
    let { brand, price, gauge, strings, rating, date, userNotes } = req.body;
    let newSet = {
      id: globalId,
      brand,
      price,
      gauge,
      strings,
      rating,
      date,
      userNotes,
    };
    sets.push(newSet);
    res.status(200).send(sets);
    globalId++;
  },

  deleteSet: (req, res) => {
    let index = sets.findIndex((elem) => elem.id === +req.params.id);
    sets.splice(index, 1);
    res.status(200).send(sets);
  },

  updateSet: (req, res) => {
    let { id } = req.params;
    let { brand, price, gauge, strings, rating, date, userNotes } = req.body;


    for (let i = 0; i < sets.length; i++) {
      if (sets[i].id === +id) {
        sets[i].brand = brand;
        sets[i].price = price;
        sets[i].gauge = gauge;
        sets[i].strings = strings;
        sets[i].rating = rating;
        sets[i].date = date;
        sets[i].userNotes = userNotes;
        res.status(200).send(sets);
      }
    }
  },
};
