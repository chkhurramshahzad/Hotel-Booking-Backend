const sharp = require("sharp");
const s3 = require("../../config/S3_config/s3.config");
let upload = require("../../config/S3_config/multer.config");
const { v1: uuidv4 } = require("uuid");
const fs = require("fs-extra");
const path = require("path");
const AWS = require("aws-sdk");
const { Product } = require("../models/product");
const { Shipment } = require("../models/shipment");
const csv = require("csv-parser");
const { Cart } = require("../models/cart");
const { User } = require("../models/users");
const { Customer } = require("../models/customer");
const { Order } = require("../models/order");

const SEND_EMAIL = async (receiver, subject, email_body) => {
  require("dotenv").config();
  const sg_mail = require("@sendgrid/mail");
  var EMAIL_API_KEY =
    process.env.EMAIL_API_KEY ||
    "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";
  sg_mail.setApiKey(EMAIL_API_KEY);
  const message = {
    to: receiver,
    from: process.env.EMAIL,
    subject: subject,
    text: email_body,
  };
  const result = await sg_mail
    .send(message)
    .then((res) => {
      console.log("Email Sent");
      return res;
    })
    .catch((err) => {
      console.log("Email did not  Send", err);
      return err;
    });
  return result;
};

const RENDER_BAD_REQUEST = (res, error) => {
  console.log(error);
  if (error.message) {
    res.status(400).json({
      code: 400,
      message: "Something went wrong. Contact Support",
    });
  } else {
    res.status(400).send(error);
  }
};

const UPLOAD_FILE_ON_LOCAL = async (files, dir, resp) => {
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      let image_file = files;
      let file_name = path.extname(files.name);
      //define upload file name store url
      let audio_file_name = uuidv4() + file_name;
      let audio_path = audio_file_name;
      let file_path = dir + audio_file_name;
      console.log("File path", file_path);
      fs.mkdirsSync(dir);
      image_file.mv(file_path, async (err) => {
        if (err) {
          console.log(err);
          resp.error = true;
          resp.error_message = err;
          return resp;
        } else {
          resolve(file_path);
          return (resp.file_path = file_path);
        }
      });
    } catch (error) {
      resp.error = true;
      resp.error_message = error;
      return resp;
    }
  });

  return myPromise;
};

const UPLOAD_AND_RESIZE_FILE = async (image_buffer_data, dir, image_size) => {
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      let image_name = uuidv4() + ".jpeg";
      await sharp(image_buffer_data)
        .jpeg({
          quality: 100,
          chromaSubsampling: "4:4:4",
        })
        .resize(image_size)
        .toFile(dir + image_name, async (err, info) => {
          if (err) resolve(false);
        });

      resolve(image_name);
    } catch (error) {
      console.log(error, "error in uploading");
      resolve(false);
    }
  });

  return myPromise;
};

const UPLOAD_S3_IMAGE = async (img_name, dir, image_data) => {
  let response = {};
  let image_file_name = "";
  let savePath = dir;
  image_file_name = img_name;

  sharp(image_data)
    .resize(300, 300)
    .toBuffer(async (err, info) => {
      if (err) {
        console.log(err, "toBuffer error in uploader");
      } else {
        upload.single("file");
        const s3Client = s3.s3Client;
        const params = s3.uploadParams;
        params.Key = savePath + image_file_name;
        params.Body = info;
        params.ContentType = "image/jpeg";
        try {
          let result = await s3Client.upload(params).promise();
          response = image_file_name;
        } catch (err) {
          console.log("error in s3 uploading", err);
        }
      }
    });

  return response;
};
const SEND_NOTIFICATION = async (message) => {
  // Send a message to devices subscribed to the provided topic.
  return admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

//  AWS SES Email
const NOTIFY_BY_EMAIL_FROM_SES = async (
  email,
  subject,
  email_body,
  attachments_file_array = []
) => {
  const SES_CONFIG = {
    accessKeyId: "AKIASFHMCRVPU3V2LPUW",
    secretAccessKey: "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",
    region: "us-west-1",
  };

  const AWS_SES = new AWS.SES(SES_CONFIG);

  let params = {
    Source: "Meta Logix Tech<support@metalogixtech.com>",
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: ["support@metalogixtech.com"],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: email_body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };
  return AWS_SES.sendEmail(params).promise(); // or something
};
const UPLOAD_SINGLE_IMAGE_on_S3 = async (
  image,
  FILE_PATH,
  file_extension,
  width,
  height = 670
) => {
  if (
    file_extension == ".pdf" ||
    file_extension == ".PDF" ||
    file_extension == ".EXCEL" ||
    file_extension == ".excel" ||
    file_extension == ".DOCX" ||
    file_extension == ".docx" ||
    file_extension == ".mp3" ||
    file_extension == ".XLSX" ||
    file_extension == ".xlsx" ||
    file_extension == ".XLS" ||
    file_extension == ".xls" ||
    file_extension == ".CSV" ||
    file_extension == ".csv" ||
    file_extension == ".DOC" ||
    file_extension == ".doc" ||
    file_extension == ".GIF" ||
    file_extension == ".gif"
  ) {
    const myPromise = new Promise(async (resolve, reject) => {
      let path = FILE_PATH + uuidv4() + file_extension;

      upload.single("file");
      const s3Client = s3.s3Client;
      const params = s3.uploadParams;
      params.Key = path;
      params.Body = image.data;
      params.ContentType = image.mimetype;
      try {
        let result = await s3Client.upload(params).promise();
      } catch (err) {
        console.log("error in s3 uploading", err);
        reject(err);
      }

      resolve(path);
    });
    return myPromise;
  } else {
    const myPromise = new Promise(async (resolve, reject) => {
      let path = FILE_PATH + uuidv4() + file_extension;
      sharp(image.data)
        .resize(width, height, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .withMetadata()
        .toBuffer(async (err, info) => {
          if (err) {
            console.log(err, "toBuffer error in uploader");
          } else {
            upload.single("file");
            const s3Client = s3.s3Client;
            const params = s3.uploadParams;
            params.Key = path;
            params.Body = info;
            params.ContentType = "image/jpeg";
            try {
              let result = await s3Client.upload(params).promise();
            } catch (err) {
              console.log("error in s3 uploading", err);
              reject(err);
            }
          }
        });
      resolve(path);
    });
    return myPromise;
  }
};

const UPLOAD_IMAGE_on_S3 = async (image, image_size_array, FILE_PATH) => {
  const myPromise = new Promise(async (resolve, reject) => {
    let file_extension = path.extname(image.name);

    if (file_extension == ".GIF" || file_extension == ".gif") {
      let main_images_obj = {};
      for (var a = 0; a < image_size_array.length; a++) {
        let height = image_size_array[a].height;
        let width = image_size_array[a].width;
        let path = FILE_PATH + uuidv4() + file_extension;

        upload.single("file");
        const s3Client = s3.s3Client;
        const params = s3.uploadParams;
        params.Key = path;
        params.Body = image.data;
        params.ContentType = image.mimetype;
        // params.ContentType = "image/jpeg";
        try {
          let result = await s3Client.upload(params).promise();
        } catch (err) {
          //console.log("error in s3 uploading", err);
          reject(err);
        }

        let obj_name = image_size_array[a].name;
        let main_image_obj = {
          [obj_name]: path,
        };
        main_images_obj = { ...main_images_obj, ...main_image_obj };
      }
      resolve(main_images_obj);
    } else {
      let main_images_obj = {};
      for (var a = 0; a < image_size_array.length; a++) {
        let height = image_size_array[a].height;
        let width = image_size_array[a].width;
        let path = FILE_PATH + uuidv4() + file_extension;

        sharp(image.data)
          .resize(width, height, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .withMetadata()
          .toBuffer(async (err, info) => {
            if (err) {
              //console.log(err, "toBuffer error in uploader");
              reject(err);
            } else {
              upload.single("file");
              const s3Client = s3.s3Client;
              const params = s3.uploadParams;
              params.Key = path;
              params.Body = info;
              //  params.ContentType = image.mimetype;
              params.ContentType = "image/jpeg";
              try {
                let result = await s3Client.upload(params).promise();
              } catch (err) {
                //console.log("error in s3 uploading", err);
              }
            }
          });
        let obj_name = image_size_array[a].name;
        let main_image_obj = {
          [obj_name]: path,
        };
        main_images_obj = { ...main_images_obj, ...main_image_obj };
      }
      resolve(main_images_obj);
    }
  });
  return myPromise;
};

const DELETE_LOCAL_FILE = (image_url, resp) => {
  fs.unlink(image_url, (err) => {
    if (err) {
      return resp.err;
    }

    console.log("Delete File successfully.");
  });
};

// function to update the product variations in the database

const UPDATE_PRODUCT_VARIATIONS = async (body, old_live_count) => {
  console.log("body", body);
  try {
    var product;
    for (var a = 0; a < body.attributes_items.length; a++) {
      product = await Product.findOne({
        _id: body.product_id,
        variation: {
          $elemMatch: {
            attributes_items: {
              $elemMatch: {
                attribute_id: body.attributes_items[a].attribute_id,
                item_id: body.attributes_items[a].item_id,
              },
            },
          },
        },
      });
    }
    if (!product) {
      // add new variation
      console.log("add new variation");

      let variation_obj = {
        variation_id: body._id,
        attributes_items: body.attributes_items,
        unit_price: body.per_unit_cost,
        quantity: Number(body.total_quantity) - Number(body.dead_count),
        available_quantity:
          Number(body.total_quantity) - Number(body.dead_count),
      };
      await Product.updateOne(
        {
          _id: body.product_id,
        },
        {
          $push: {
            variation: variation_obj,
          },
        }
      );
    } else {
      console.log("update variation else case ");
      // update variation quantity by substraction of old live count and new live count and add new dead count

      var variation_index = 0;
      var vaiation_id = "";
      var old_quantity = 0;
      var old_available_quantity = 0;
      for (var a = 0; a < product.variation.length; a++) {
        if (
          JSON.stringify(product.variation[a].attributes_items) ==
          JSON.stringify(body.attributes_items)
        ) {
          variation_index = a;
          vaiation_id = product.variation[a]._id;
          old_quantity = product.variation[a].quantity;
          old_available_quantity = product.variation[a].available_quantity;
        }
      }

      var new_quantity =
        Number(old_quantity) - Number(old_live_count) + Number(body.live_count);

      var new_available_quantity =
        Number(old_available_quantity) -
        Number(old_live_count) +
        Number(body.live_count);
    }

    var result = await Product.updateMany(
      {
        _id: body.product_id,
        "variation._id": vaiation_id,
      },
      {
        $set: {
          "variation.$.quantity": new_quantity,
          "variation.$.available_quantity": new_available_quantity,
        },
      },
      { multi: true }
    );

    console.log("update variation result", result);
  } catch (error) {
    console.log("error in finding product", error);
    return error;
  }
};

// create a guest user for ordwr placement

const CREATE_GUEST_USER = async () => {
  try {
    let user = new User({
      email: "",
      password: "",
      type: 1,
      user_type: "guest_user",
      status: true,
    });
    let user_data = await user.save();

    // create customer

    let customer = new Customer({
      user_id: user_data._id,
      first_name: "",
      last_name: "",
    });
    let customer_data = await customer.save();
    return user_data;
  } catch (error) {
    return error;
  }
};

//function to make  order items array

const MAKE_ORDER_ITEMS_ARRAY = async (body, resp) => {
  try {
    let order_item_array = [];
    var order_items = body.order_items;
    for (var a = 0; a < order_items.length; a++) {
      let order_item_obj = {
        product_id: order_items[a].product_id,
        quantity: order_items[a].quantity,
        price: order_items[a].price,
        variation: order_items[a].variation,
      };
      let update_product_variations = await UPDATE_PRODUCT_VARIATIONS_QUANTITY(
        order_item_obj,
        resp
      );
    }
  } catch (error) {
    return resp.error;
  }
};

//function to make  order items array

const MAKE_PREPARED_ORDER_ITEMS_ARRAY = async (body, resp) => {
  try {
    let order_item_array = [];
    var order_items = body.items;

    for (var a = 0; a < order_items.length; a++) {
      var shipment_item = order_items[a].shipment;

      for (var b = 0; b < shipment_item.length; b++) {
        let order_item_obj = {
          product_id: order_items[a].product_id,
          shipment_id: shipment_item[b]._id,
          quantity: shipment_item[b].quantity,
          variation: order_items[a].variation,
        };
       
        let update_product_variations = await UPDATE_SHIPMENT_ITEMS_QUANTITY(
          order_item_obj,
          resp
        );
      }
    }
  } catch (error) {
    return resp.error;
  }
};

const UPDATE_PRODUCT_VARIATIONS_QUANTITY = async (order_item, resp) => {
  try {
    // find the product
    var product;

    var variation = order_item.variation;
    var quantity = order_item.quantity;
    var product_id = order_item.product_id;

    var product = await Product.findOne({
      _id: product_id,
      "variation._id": variation,
    });

    if (product) {
      // update the product variation quantity and available quantity

      let update_product_variation = await Product.updateOne(
        {
          _id: product_id,
          "variation._id": variation,
        },
        {
          $inc: {
            "variation.$.sold_quantity": Number(quantity),
            "variation.$.available_quantity": -Number(quantity),
          },
        },
        {
          new: true,
        }
      );
    }

    return product;
  } catch (error) {
    return resp.error;
  }
};

const UPDATE_SHIPMENT_ITEMS_QUANTITY = async (item, resp) => {
  try {
    var variation = item.variation;
    var quantity = item.quantity;
    var product_id = item.product_id;
    var shipment_id = item.shipment_id;

    var product = await Product.findOne(
      {
        _id: product_id,
        "variation._id": variation,
      },
      {
        "variation.$": 1,
      }
    );

    var variation_id = product.variation[0].variation_id;

    if (product) {
      // update the Shipment quantity and available quantity

      let update_shipment_item = await Shipment.findOneAndUpdate(
        {
          _id: shipment_id,
          "order_shipment_item._id": variation_id,
        },
        {
          $inc: {
            "order_shipment_item.$.sold_quantity": Number(quantity),
            "order_shipment_item.$.available_quantity": -Number(quantity),
          },
        },
        {
          new: true,
        }
      );
    }

    return product;
  } catch (error) {
    return resp.error;
  }
};

//Read product csv file
const READ_PRODUCT_CSV_FILE = async (path) => {
  return new Promise((resolve, reject) => {
    let array_of_records = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", async (row) => {
        if (row["is_featured"].toLowerCase()) {
          is_featured = true;
        }
        if (row["is_on_sale"].toLowerCase()) {
          is_on_sale = true;
        }
        if (row["status"].toLowerCase()) {
          status = true;
        }

        let product_data = {
          common_name: row["common_name"],
          scientific_name: row["scientific_name"],
          short_description: row["short_description"],
          detail_description: row["detail_description"],
          is_featured: is_featured,
          is_on_sale: is_on_sale,
          status: status,
          discount_percentage: row["discount_percentage"],
        };
        array_of_records.push(product_data);
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        //console.log("CSV file successfully processed");
        resolve(array_of_records);
      });
  });
};

//Read shipment csv file
const READ_SHIPMENT_CSV_FILE = async (path) => {
  return new Promise((resolve, reject) => {
    let array_of_records = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", async (row) => {
        if (row["is_featured"].toLowerCase()) {
          is_featured = true;
        }
        if (row["is_on_sale"].toLowerCase()) {
          is_on_sale = true;
        }
        if (row["status"].toLowerCase()) {
          status = true;
        }

        let shipment_data = {
          common_name: row["common_name"],
          scientific_name: row["scientific_name"],
          short_description: row["short_description"],
          detail_description: row["detail_description"],
          is_featured: is_featured,
          is_on_sale: is_on_sale,
          status: status,
          discount_percentage: row["discount_percentage"],
        };
        array_of_records.push(shipment_data);
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        //console.log("CSV file successfully processed");
        resolve(array_of_records);
      });
  });
};

module.exports = {
  RENDER_BAD_REQUEST,
  UPLOAD_AND_RESIZE_FILE,
  UPLOAD_FILE_ON_LOCAL,
  UPLOAD_S3_IMAGE,
  SEND_NOTIFICATION,
  NOTIFY_BY_EMAIL_FROM_SES,
  UPLOAD_SINGLE_IMAGE_on_S3,
  UPLOAD_IMAGE_on_S3,
  DELETE_LOCAL_FILE,
  SEND_EMAIL,
  UPDATE_PRODUCT_VARIATIONS,
  UPDATE_PRODUCT_VARIATIONS_QUANTITY,
  MAKE_ORDER_ITEMS_ARRAY,
  CREATE_GUEST_USER,
  MAKE_PREPARED_ORDER_ITEMS_ARRAY,
  READ_PRODUCT_CSV_FILE,
  READ_SHIPMENT_CSV_FILE,
};
