import mongoose from "mongoose";
import Listing from "./models/listing-model.js";
import connectMongoDb from "./configs/database-connection.js";
//import dotenv from "dotenv";

//dotenv.config(); // Load environment variables if using .env

const dbUrl = "mongodb://localhost:27017/wanderer";

//connecting to mongodb database
connectMongoDb(dbUrl);

const sampleListings = [
  {
    title: "Cozy Apartment in New York",
    description:
      "A beautiful and comfortable apartment in the heart of New York City.",
    price: 1200,
    location: "Manhattan",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Modern Condo in Los Angeles",
    description: "A stylish and modern condo with an amazing city view.",
    price: 1500,
    location: "Los Angeles",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Beach House in Miami",
    description: "A stunning beach house with an oceanfront view.",
    price: 2500,
    location: "Miami",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Luxury Villa in Dubai",
    description: "A high-end villa with a private pool and luxury amenities.",
    price: 5000,
    location: "Palm Jumeirah",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Cabin in the Woods",
    description: "A peaceful and cozy cabin surrounded by nature.",
    price: 800,
    location: "Colorado",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Penthouse in London",
    description:
      "A luxurious penthouse in central London with a rooftop terrace.",
    price: 4000,
    location: "London",
    country: "UK",
    image:
      "https://images.unsplash.com/photo-1575403071235-5dcd06cbf169?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Traditional Ryokan in Kyoto",
    description: "Experience a traditional Japanese inn with onsen baths.",
    price: 1200,
    location: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1430285561322-7808604715df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Countryside Farmhouse",
    description: "A rustic farmhouse with scenic countryside views.",
    price: 1000,
    location: "Texas",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Ski Resort Lodge",
    description:
      "A cozy lodge near a ski resort, perfect for winter vacations.",
    price: 1800,
    location: "Aspen",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1604601638406-edc29b54dcf7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Lakefront Cottage",
    description:
      "A charming cottage by the lake, ideal for a peaceful getaway.",
    price: 1100,
    location: "Canada",
    country: "Canada",
    image:
      "https://plus.unsplash.com/premium_photo-1683586218149-e3b33ff9c02a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Function to insert data
const seedDB = async () => {
  try {
    await Listing.deleteMany(); // Clears existing listings
    console.log("Existing listings deleted");

    await Listing.insertMany(sampleListings);
    console.log("Sample listings added successfully");

    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Run seeding function
seedDB();
