const {user} = require("../../models");
const fs = require("fs");

exports.getUsers = async (req, res) => {
  try {
    let data = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    data = JSON.parse(JSON.stringify(data));
    const newData = data.map((item) => {
      const avatar = item.avatar
        ? "http://localhost:5000/uploads/" + item.avatar
        : null;

      return {
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        gender: item.gender,
        phone: item.phone,
        city: item.city,
        avatar: avatar,
      };
    });

    res.send({
      status: "success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const idUser = req.user.id;
    const id = idUser;

    const data = await user.findOne({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).send({
        status: "failed",
        message: "User not found",
      });
    }

    if (req.user.status === "admin") {
      return res.send({
        status: "success",
        data,
      });
      // check if token id equals or not with id params
    } else if (req.user.id !== parseInt(id)) {
      // req.user from auth
      return res.status(400).send({
        status: "failed",
        message: "Access Denied!",
      });
    }

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    const {id} = req.user;

    await user.update(
      {
        ...req.body,
        avatar: "http://localhost:5000/uploads/" + req.files.avatar[0].filename,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.send({
      status: "success",
      message: `Update User finished`,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  }
};

exports.UpdateUserById = async (req, res) => {
  try {
    const {id} = req.user;

    await user.update(
      {
        ...req.body,
      },
      {
        where: {
          id,
        },
      }
    );

    res.send({
      status: "success",
      message: `Update profile finished`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    await user.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      send({
        status: "Failed",
        message: "Deleted is Failed",
      });
  }
};
