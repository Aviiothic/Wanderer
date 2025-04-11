import mongoose from "mongoose";
import Listing from "./models/listing-model.js";
import Review from "./models/review-model.js";
import User from "./models/user-model.js"

import connectMongoDb from "./configs/database-connection.js";

const dbUrl = "mongodb://localhost:27017/wanderer";
connectMongoDb(dbUrl);

const sampleListings = [
  {
    title: "Cozy Apartment in New York",
    description: "A beautiful and comfortable apartment in the heart of New York City.",
    price: 1200,
    location: "Manhattan",
    country: "USA",
    geometry: { type: "Point", coordinates: [-73.9712, 40.7831] },
    image: {
      url: "https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing-img-1"
    },
    owner: "67f4f811046d250bf924ee1e"
  },
  {
    title: "Modern Condo in Los Angeles",
    description: "A stylish and modern condo with an amazing city view.",
    price: 1500,
    location: "Los Angeles",
    country: "USA",
    geometry: { type: "Point", coordinates: [-118.2437, 34.0522] },
    image: {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing-img-2"
    },
    owner: "67f4f811046d250bf924ee1e"
  },
  {
    title: "Beach House in Miami",
    description: "A stunning beach house with an oceanfront view.",
    price: 2500,
    location: "Miami",
    country: "USA",
    geometry: { type: "Point", coordinates: [-80.1918, 25.7617] },
    image: {
      url: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing-img-3"
    },
    owner: "67f4f811046d250bf924ee1e"
  },
  {
    title: "Luxury Villa in Dubai",
    description: "A high-end villa with a private pool and luxury amenities.",
    price: 5000,
    location: "Palm Jumeirah",
    country: "UAE",
    geometry: { type: "Point", coordinates: [55.1364, 25.1120] },
    image: {
      url: "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing-img-4"
    },
    owner: "67f4f811046d250bf924ee1e"
  },
  {
    title: "Cabin in the Woods",
    description: "A peaceful and cozy cabin surrounded by nature.",
    price: 800,
    location: "Colorado",
    country: "USA",
    geometry: { type: "Point", coordinates: [-105.7821, 39.5501] },
    image: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing-img-5"
    },
    owner: "67f4f811046d250bf924ee1e"
  },
  {
    title: "Penthouse in London",
    description: "A luxurious penthouse in central London with a rooftop terrace.",
    price: 4000,
    location: "London",
    country: "UK",
    geometry: { type: "Point", coordinates: [-0.1276, 51.5072] },
    image: {
      url: "https://images.unsplash.com/photo-1575403071235-5dcd06cbf169?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing-img-6"
    },
    owner: "67f4f811046d250bf924ee1e"
  },
  {
    title: "Traditional Ryokan in Kyoto",
    description: "Experience a traditional Japanese inn with onsen baths.",
    price: 1200,
    location: "Kyoto",
    country: "Japan",
    geometry: { type: "Point", coordinates: [135.7681, 35.0116] },
    image: {
      url: "https://images.unsplash.com/photo-1430285561322-7808604715df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing-img-7"
    },
    owner: "67f4f811046d250bf924ee1e"
  },
  {
    title: "Countryside Farmhouse",
    description: "A rustic farmhouse with scenic countryside views.",
    price: 1000,
    location: "Texas",
    country: "USA",
    geometry: { type: "Point", coordinates: [-99.9018, 31.9686] },
    image: {
      url: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing-img-8"
    },
    owner: "67f4f811046d250bf924ee1e"
  },
  {
    title: "Ski Resort Lodge",
    description: "A cozy lodge near a ski resort, perfect for winter vacations.",
    price: 1800,
    location: "Aspen",
    country: "USA",
    geometry: { type: "Point", coordinates: [-106.8175, 39.1911] },
    image: {
      url: "https://images.unsplash.com/photo-1604601638406-edc29b54dcf7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing-img-9"
    },
    owner: "67f4f811046d250bf924ee1e"
  },
  {
    title: "Lakefront Cottage",
    description: "A charming cottage by the lake, ideal for a peaceful getaway.",
    price: 1100,
    location: "Canada",
    country: "Canada",
    geometry: { type: "Point", coordinates: [-106.3468, 56.1304] },
    image: {
      url: "https://plus.unsplash.com/premium_photo-1683586218149-e3b33ff9c02a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing-img-10"
    },
    owner: "67f4f811046d250bf924ee1e"
  }
];



const sampleComments = [
  "Great place to stay!",
  "Very clean and well located.",
  "Had an amazing experience.",
  "Would love to visit again!",
  "Highly recommend this listing.",
  "The room was spacious and comfortable.",
  "Perfect location near public transport.",
  "Host was friendly and helpful throughout.",
  "Quiet neighborhood and safe surroundings.",
  "Clean bathroom and fresh linens provided.",
  "Wi-Fi was fast and reliable.",
  "Kitchen was well equipped for cooking.",
  "Mattress was a bit firm but okay.",
  "Walls were a bit thin, could hear neighbors.",
  "Check-in took longer than expected.",
  "Not as clean as shown in the pictures.",
  "The location was noisy at night.",
  "Bathroom had a plumbing issue.",
  "Felt overpriced for what it offered.",
  "Wouldn’t recommend for a long stay."
];


const seedDB = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Listing.deleteMany();
    await Review.deleteMany();

    // Register users
    const createdUsers = [];
    for (const u of dummyUsers) {
      const newUser = new User({ email: u.email, username: u.username });
      const registeredUser = await User.register(newUser, u.password);
      createdUsers.push(registeredUser);
    }
    console.log("✅ Users registered");

    // Insert listings
    const listingsWithOwner = sampleListings.map((listing) => {
      const randomOwner = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      return { ...listing, owner: randomOwner._id };
    });
    const createdListings = await Listing.insertMany(listingsWithOwner);
    console.log("✅ Listings created");

    // Create and associate reviews
    const reviews = [];

    for (let listing of createdListings) {
      const reviewCount = Math.floor(Math.random() * 3) + 3; // 3-5 reviews
      const reviewIds = [];

      for (let i = 0; i < reviewCount; i++) {
        const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
        const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
        const randomRating = Math.floor(Math.random() * 3) + 3; // 3-5

        const review = new Review({
          rating: randomRating,
          comment: randomComment,
          author: randomUser._id,
          listing: listing._id,
        });

        await review.save();
        reviewIds.push(review._id);
      }

      // Push review IDs into listing and save it
      listing.reviews.push(...reviewIds);
      await listing.save();
    }

    console.log("✅ Reviews created and linked to listings");
    mongoose.connection.close();
    console.log("🌱 Seeding complete. Connection closed.");
  } catch (err) {
    console.error("❌ Error during seeding:", err.message);
    mongoose.connection.close();
  }
};



seedDB();