const { ProductModel } = require("../models");

exports.delete = async ({ id }) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    return deletedProduct;
  } catch (error) {
    throw `Delete product error: ${error}`;
  }
};

exports.update = async ({ id, product }) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, {
      new: true
    });

    return updatedProduct;
  } catch (error) {
    throw `Update product error: ${error}`;
  }
};

exports.list = async ({ fields, filter, limit, page, sort }) => {
  try {
    limit && limit > 0
      ? (limit = parseInt(limit))
      : () => {
          throw "Wrong format limit";
        };

    limit && limit > 0
      ? (limit = parseInt(limit))
      : () => {
          throw "Wrong format page";
        };

    const products = await ProductModel.find(filter)
      .select(selectFieldsShow(fields))
      .limit(limit)
      .skip(limit * (page - 1))
      .sort(sort);

    return products;
  } catch (error) {
    throw `Get list products error: ${error}`;
  }
};

const selectFieldsShow = fields => {
  if (fields) {
    return fields.split(",").join(" ");
  }

  return "";
};

/**
 * @param {object} product
 */
exports.create = async product => {
  try {
    const newProduct = await ProductModel.create(product);

    return newProduct;
  } catch (error) {
    throw `Create product error: ${error}`;
  }
};
