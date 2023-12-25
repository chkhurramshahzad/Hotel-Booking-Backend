// constants file
const CUSTOMER_IMAGE_PATH = base_upload_dir + "customer_images/";

const CATEGORY_IMAGE_SIZES = [
  {
    name: "thumbnail_1",
    width: 1000,
    height: 670,
  },

  {
    name: "thumbnail_2",
    width: 200,
    height: 200,
  },
];

const CTAEGORY_IMAGE_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".JPG",
  ".JPEG",
  ".PNG",
  ".WEBP",
  ".GIF",
];

const CUSTOMER_IMAGE_SIZES = [
  {
    name: "thumbnail_1",
    width: 1000,
    height: 670,
  },

  {
    name: "thumbnail_2",
    width: 200,
    height: 200,
  },
];

const CUSTOMER_IMAGE_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".JPG",
  ".JPEG",
  ".PNG",
  ".WEBP",
  ".GIF",
];


const PRIVILEGES = [
  {
    privilege_item_lable: "Employee",
    privilege_item_for: "employee",
    privilege_items: [
      {
        privilege_label_text: "Add Employee",
        privilege_label_for: "add_employee",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit Employee",
        privilege_label_for: "edit_employee",
        privilege_access: false,
      },
      {
        privilege_label_text: "Delete Employee",
        privilege_label_for: "delete_employee",
        privilege_access: false,
      },
      {
        privilege_label_text: "View Employee",
        privilege_label_for: "view_employee",
        privilege_access: false,
      },
    ],
  },
  {
    privilege_item_lable: "Category",
    privilege_item_for: "category",

    privilege_items: [
      {
        privilege_label_text: "Add Category",
        privilege_label_for: "add_category",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit Category",
        privilege_label_for: "edit_category",
        privilege_access: false,
      },
      {
        privilege_label_text: "Delete Category",
        privilege_label_for: "delete_category",
        privilege_access: false,
      },
      {
        privilege_label_text: "View Category",
        privilege_label_for: "view_category",
        privilege_access: false,
      },
    ],
  },
  {
    privilege_item_lable: "Product",
    privilege_item_for: "product",
    privilege_items: [
      {
        privilege_label_text: "Add Product",
        privilege_label_for: "add_product",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit Product",
        privilege_label_for: "edit_product",
        privilege_access: false,
      },
      {
        privilege_label_text: "Delete Product",
        privilege_label_for: "delete_product",
        privilege_access: false,
      },
      {
        privilege_label_text: "View Product",
        privilege_label_for: "view_product",
        privilege_access: false,
      },
    ],
  },
  {
    privilege_item_lable: "Order",
    privilege_item_for: "order",
    privilege_items: [
      {
        privilege_label_text: "Add Order",
        privilege_label_for: "add_order",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit Order",
        privilege_label_for: "edit_order",
        privilege_access: false,
      },
      {
        privilege_label_text: "Delete Order",
        privilege_label_for: "delete_order",
        privilege_access: false,
      },
      {
        privilege_label_text: "View Order",
        privilege_label_for: "view_order",
        privilege_access: false,
      },
    ],
  },
  {
    privilege_item_lable: "Vendor",
    privilege_item_for: "vendor",
    privilege_items: [
      {
        privilege_label_text: "Add Vendor",
        privilege_label_for: "add_vendor",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit Vendor",
        privilege_label_for: "edit_vendor",
        privilege_access: false,
      },
      {
        privilege_label_text: "Delete Vendor",
        privilege_label_for: "delete_vendor",
        privilege_access: false,
      },
      {
        privilege_label_text: "View Vendor",
        privilege_label_for: "view_vendor",
        privilege_access: false,
      },
    ],
  },
  {
    privilege_item_lable: "Shipment",
    privilege_item_for: "shipment",
    privilege_items: [
      {
        privilege_label_text: "Add Shipment",
        privilege_label_for: "add_shipment",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit Shipment",
        privilege_label_for: "edit_shipment",
        privilege_access: false,
      },
      {
        privilege_label_text: "Delete Shipment",
        privilege_label_for: "delete_shipment",
        privilege_access: false,
      },
      {
        privilege_label_text: "View Shipment",
        privilege_label_for: "view_shipment",
        privilege_access: false,
      },
    ],
  },
  {
    privilege_item_lable: "Attribute Variant",
    privilege_item_for: "attribute_variant",
    privilege_items: [
      {
        privilege_label_text: "Add Attribute Variant",
        privilege_label_for: "add_attribute_variant",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit Attribute Variant",
        privilege_label_for: "edit_attribute_variant",
        privilege_access: false,
      },
      {
        privilege_label_text: "Delete Attribute Variant",
        privilege_label_for: "delete_attribute_variant",
        privilege_access: false,
      },
      {
        privilege_label_text: "View Attribute Variant",
        privilege_label_for: "view_attribute_variant",
        privilege_access: false,
      },
    ],
  },

  {
    privilege_item_lable: "Task",
    privilege_item_for: "task",
    privilege_items: [
      {
        privilege_label_text: "Add Task",
        privilege_label_for: "add_task",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit Task",
        privilege_label_for: "edit_task",
        privilege_access: false,
      },
      {
        privilege_label_text: "Delete Task",
        privilege_label_for: "delete_task",
        privilege_access: false,
      },
      {
        privilege_label_text: "View Task",
        privilege_label_for: "view_task",
        privilege_access: false,
      },
    ],
  },

  {
    privilege_item_lable: "Website Setting",
    privilege_item_for: "website_setting",
    privilege_items: [
      {
        privilege_label_text: "Add Website Setting",
        privilege_label_for: "add_website_setting",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit Website Setting",
        privilege_label_for: "edit_website_setting",
        privilege_access: false,
      },
      {
        privilege_label_text: "Delete Website Setting",
        privilege_label_for: "delete_website_setting",
        privilege_access: false,
      },
      {
        privilege_label_text: "View Website Setting",
        privilege_label_for: "view_website_setting",
        privilege_access: false,
      },
    ],
  },

  {
    privilege_item_lable: "General Setting",
    privilege_item_for: "general_setting",
    privilege_items: [
      {
        privilege_label_text: "Add General Setting",
        privilege_label_for: "add_general_setting",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit General Setting",
        privilege_label_for: "edit_general_setting",
        privilege_access: false,
      },
      {
        privilege_label_text: "View General Setting",
        privilege_label_for: "view_general_setting",
        privilege_access: false,
      },
    ],
  },

  {
    privilege_item_lable: "Home Setting",
    privilege_item_for: "home_setting",
    privilege_items: [
      {
        privilege_label_text: "Add Home Setting",
        privilege_label_for: "add_home_setting",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit Home Setting",
        privilege_label_for: "edit_home_setting",
        privilege_access: false,
      },
      {
        privilege_label_text: "View Home Setting",
        privilege_label_for: "view_home_setting",
        privilege_access: false,
      },
    ],
  },

  {
    privilege_item_lable: "Socail Setting",
    privilege_item_for: "socail_setting",
    privilege_items: [
      {
        privilege_label_text: "Add Socail Setting",
        privilege_label_for: "add_socail_setting",
        privilege_access: false,
      },
      {
        privilege_label_text: "Edit Socail Setting",
        privilege_label_for: "edit_socail_setting",
        privilege_access: false,
      },
      {
        privilege_label_text: "View Socail Setting",
        privilege_label_for: "view_socail_setting",
        privilege_access: false,
      },
    ],
  },
];

module.exports = {
  TYPE_IMAGE,
  TYPE_AUDIO,
  CTAEGORY_IMAGE_EXTENSIONS,
  CATEGORY_IMAGE_PATH,
  EMPLOYEE_IMAGE_PATH,
  VENDOR_IMAGE_PATH,
  GENERAL_IMAGE_PATH,
  CATEGORY_IMAGE_SIZES,
  PRIVILEGES,
  ADMIN_IMAGE_PATH,
  CUSTOMER_IMAGE_PATH,
  CUSTOMER_IMAGE_EXTENSIONS,
  CUSTOMER_IMAGE_SIZES,
  PRODUCT_PATH,
  SHIPMENT_PATH
};
