const { UserModel } = require("../models");

exports.delete = async ({ id }) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);

    return deletedUser;
  } catch (error) {
    throw `Delete user error: ${error}`;
  }
};

exports.update = async ({ id, user }) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true
    });

    return updatedUser;
  } catch (error) {
    throw `Update user error: ${error}`;
  }
};

exports.list = async ({ fields, filter, limit, page, sort }) => {
  try {
    limit && limit > 0
      ? (limit = parseInt(limit))
      : () => {
          throw "Wrong format limit";
        };

    page && page > 0
      ? (page = parseInt(page))
      : () => {
          throw "Wrong format page";
        };

    const users = await UserModel.find(filter)
      .select(selectFieldsShow(fields))
      .limit(limit)
      .skip(limit * (page - 1))
      .sort(sort);

    return users;
  } catch (error) {
    throw `Get list users error: ${error}`;
  }
};

const selectFieldsShow = fields => {
  if (fields) {
    return fields.split(",").join(" ");
  }

  return "";
};

/**
 * @param {object} user
 */
exports.create = async user => {
  try {
    const newUser = await UserModel.create(user);

    return newUser;
  } catch (error) {
    throw `Create user error: ${error}`;
  }
};
