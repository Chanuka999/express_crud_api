import bcrypt from "bcrypt";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const createUser = (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashPassword,
  });

  user
    .save()
    .then(() => {
      res.status(200).json({ success: true, message: "register successfull" });
    })
    .catch(() => {
      res
        .status(404)
        .json({ status: false, message: "register unsuccessfull" });
    });
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatching = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatching) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, date: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });

    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updateUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidation: true,
    });

    if (!updateUser)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
