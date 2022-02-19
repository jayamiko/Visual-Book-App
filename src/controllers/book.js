const {tb_book, genre} = require("../../models");
const Joi = require("joi");

exports.getBook = async (req, res) => {
  const {id} = req.params;

  try {
    let data = await tb_book.findOne({
      where: {
        id,
      },
      include: {
        model: genre,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = {
      ...data,
      attachement: "http://localhost:5000/uploads/" + data.attachement,
    };

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

exports.getBooks = async (req, res) => {
  try {
    let data = await tb_book.findAll({
      include: {
        model: genre,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [
        ["idGenre", "DESC"],
        ["updatedAt", "DESC"],
      ],
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = data.map((item) => ({
      ...item,
      attachement: {
        filename: item.attachement,
        url: "http://localhost:5000/uploads/" + item.attachement,
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

exports.getSearch = async (req, res) => {
  const titleQuery = req.query.title;
  const {Op} = require("sequelize");

  try {
    let data = await tb_book.findAll({
      where: {
        title: {
          [Op.substring]: titleQuery,
        },
      },
      include: {
        model: genre,
        as: "genres",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = data.map((item) => ({
      id: item.id,
      title: item.title,
      publishIn: item.publishIn,
      pages: item.pages,
      isbn: item.isbn,
      author: item.author,
      status: item.status,
      idGenre: item.idGenre,
      reviews: item.reviews,
      price: item.price,
      rating: item.rating,
      description: item.description,
      attachement: "http://localhost:5000/uploads/" + item.attachement,
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

exports.addBook = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    idGenre: Joi.number().required(),
    publishIn: Joi.date().required(),,
    pages: Joi.number().min(1).required(),
    rating: Joi.number().min(1),
    reviews: Joi.number().min(1),
    isbn: Joi.number().min(9).max(15).required(),,
    author: Joi.string().min(3).required(),
    status: Joi.string().required(),
    price: Joi.string().required(),,
    description: Joi.string(),
  });

  const {error} = schema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).send({
      status: "Failed",
      message: error.details[0].message,
    });
  }

  try {
    const newBook = await tb_book.create({
      ...req.body,
      attachement: req.file.filename,
      status: "Waiting Approve",
    });

    let data = await tb_book.findOne({
      where: {
        id: newBook.id,
      },

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    data = JSON.parse(JSON.stringify(data));

    const newData = {
      ...data,
      attachement: "http://localhost:5000/uploads/" + data.attachement,
    };

    res.send({
      status: "Success",
      message: "Book has successfully added",
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

exports.updateBook = async (req, res) => {
  const {id} = req.params;

  try {
    await tb_book.update(req.body, {
      where: {
        id,
      },
    });

    let data = await tb_book.findOne({
      where: {
        id,
      },
      include: {
        model: genre,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    const newData = {
      ...data,
      attachement: "http://localhost:5000/uploads/" + data.attachement,
    };

    res.send({
      status: "Success",
      message: "Updated Status Book has succesfully",
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

exports.deleteBook = async (req, res) => {
  try {
    const {id} = req.params;
    await tb_book.destroy({
      where: {id},
    });
    res.send({
      status: "success",
      message: `delete book id ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
