const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const { Schema } = mongoose;

const options = {
  separator: "-",
  lang: "en",
  truncate: 120,
};

// Brand Schema
const BrandSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: "Merchant",
    default: null,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

BrandSchema.plugin(slug, options);

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
