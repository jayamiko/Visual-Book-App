const {genre} = require("../../models");

exports.getGenres = async (req, res) => {
  try {
    const data = await genre.findAll({
      attributes: ["id", "name"],
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "No data found",
    });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const {id} = req.params;
    const data = await genre.findOne({
      where: {
        id,
      },
      attributes: ["id", "name"],
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "No data found",
    });
  }
};

exports.addGenre = async (req, res) => {
  try {
    const data = await genre.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (data) {
      return res.status(400).send({
        status: "Failed",
        message: "Genre Already Exist",
      });
    }

    await genre.create(req.body);
    res.send({
      status: "success",
      message: "Add genre has Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const {id} = req.params;
    await genre.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "Success",
      message: "Deleted genre is succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Deleted genre is Failed",
    });
  }
};
