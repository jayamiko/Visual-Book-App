const {user, tb_book, genre, collection} = require("../../models");

exports.getCollection = async (req, res) => {
  const {id} = req.params;

  try {
    let data = await collection.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: tb_book,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: user,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: genre,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = data.map((item) => ({
      ...item,
      book: {
        ...item.book,
        attachement: "http://localhost:5000/upload/" + item.book.attachement,
      },
      genre: {
        ...item.genre,
      },
      user: {
        ...item.user,
        avatar: "http://localhost:5000/upload/" + item.user.avatar,
      },
    }));

    res.send({
      status: "Success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server error",
    });
  }
};

exports.addCollection = async (req, res) => {
  try {
    const newCollection = await collection.create(req.body);

    const data = await collection.findOne({
      where: {
        id: newCollection.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success",
      message: "Book has been added to your collection",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server error",
    });
  }
};

exports.deleteCollection = async (req, res) => {
  const {id} = req.params;

  try {
    await collection.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: "Book has been deleted from your collection",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Server error",
    });
  }
};
