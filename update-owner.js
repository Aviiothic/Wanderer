//this file is to update the owners of listings created initially without
//any owner

import mongoose from "mongoose";
import Listing from "./models/listing-model.js";
import connectMongoDb from "./configs/database-connection.js";

const dbUrl = "mongodb://localhost:27017/wanderer";
connectMongoDb(dbUrl);

const assignOwner = async () => {
  try {
    const result = await Listing.updateMany(
      {}, // Match all listings
      { $set: { owner: "67f2ddd522376c4df8e8d704" } } // Set owner field
    );

    console.log(`${result.modifiedCount} listings updated with owner.`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating listings:", error);
  }
};

assignOwner();
