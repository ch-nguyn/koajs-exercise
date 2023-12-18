import {
  getData,
  getOne,
  deleteOne,
  addOne,
  updateOne,
} from "../../database/productRepository.js";

export const getAllProducts = async (ctx) => {
  try {
    const products = getData(ctx.query);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: products,
    });
  } catch (e) {
    console.error(e);
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

export const getSingleProduct = async (ctx) => {
  try {
    const product = getOne(ctx.params.id, ctx.query.fields);
    console.log(2);
    if (!product) {
      throw new Error("There's no product with that ID");
    }

    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: product,
    });
  } catch (e) {
    console.error(e);

    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

export const deleteProduct = async (ctx) => {
  try {
    const { id } = ctx.params;
    const product = getOne(id);

    if (!product) {
      throw new Error("There's no product with that ID");
    }

    deleteOne(product);

    ctx.status = 204;
    return (ctx.body = {
      success: true,
      message: "Deleted successfully!",
    });
  } catch (e) {
    console.error(e);
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

export const createProduct = async (ctx) => {
  try {
    const product = ctx.request.body;
    if (getOne(product.id)) {
      throw new Error("Product has already existed");
    }

    addOne(product);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data: product,
    });
  } catch (e) {
    console.error(e);
    ctx.status = 400;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

export const updateProduct = async (ctx) => {
  try {
    const { body } = ctx.request;
    const { id } = ctx.params;

    const product = getOne(id);
    if (!product) {
      throw new Error("There's no product with that ID");
    }

    updateOne(product, body);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    console.error(e);
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};
