import path from "path";
import { fileURLToPath } from "url";
import Listing from "../models/listing-model.js";
import User from "../models/user-model.js";
import wrapAsync from "../utils/wrap-async.js";
import AppError from "../utils/error-util.js";
import { cloudinary } from "../configs/cloud-config.js";

const defaultImage =
  "https://res.cloudinary.com/dzl0xlxkc/image/upload/v1744113376/Default-Image_vai3sr.jpg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//show all listings
const showAllListings = async (req, res, next) => {
  try {
    const allListings = await Listing.find();
    res.render("listings/show-all-listings", { allListings });
  } catch (error) {
    // console.error('Showing all Listings :', error);
    // res.status(500).send('Internal Server Error');
    next(error); //custom error handler
  }
};

//from now on we will use wrapAsync instead of try and catch

//show particlular listing with id
const showSingleListing = wrapAsync(async (req, res, next) => {
  const listingId = req.params.id;
  const listing = await Listing.findById(listingId)
    .populate("owner")
    .populate({path: "reviews",
      populate: {
        path: "author",
        model: "User"
      }
    });// populate reviews with author

  if (!listing) {
    //return res.status(404).send('Listing not found');
    req.flash("error", "The Listing You Requested Does not Exists! ");
    return res.redirect("/listings");
  }
  res.render("listings/show-single-listing", { listing });
});

//form to add listings
const addListingForm = (req, res, next) => {
  res.render("listings/add-listing-form.ejs");
};

//controller to add listing
const addListing = wrapAsync(async (req, res, next) => {
  if (!req.body.listing) {
    throw new AppError(400, "Listing is required");
  }
  // let url = req.file.path;
  // let filename = req.file.filename;
  
  // Ensure default image is set if image field is empty
  // if (!req.body.listing.image || req.body.listing.image.trim() === "") {
  //   req.body.listing.image = defaultImage;
  // }

  const newListing = new Listing(req.body.listing);

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  } else {
    newListing.image = {
      url: defaultImage,
      filename: "default-image"
    };
  }
  newListing.owner = req.user._id;
  await newListing.save();

  req.flash("success", "New Listing Created! ");

  res.redirect(`/listings/${newListing._id}`); // ✅ Redirects after successful save
  //res.status(201).json({ success: true, listing: newListing }); // ✅ Sends JSON response
});

//aage wale me try catch hi rhne diya hu kon itna mehnat kre
const editListingForm = async (req, res, next) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listings/edit-listing-form", { listing });
  } catch (error) {
    console.error("Error Showing Listing :", error);
    res.status(500).send("Internal Server Error");
  }
};

//update the listing
const updateListing = async (req, res, next) => {
  try {
    const listingId = req.params.id;
    const oldListing = await Listing.findById(listingId);

    // Extract listing data
    const updatedData = { ...req.body.listing };

    // If new image uploaded, include it
    if (req.file) {
      //deleting the old image from cloudinary
      if (
        oldListing.image &&
        oldListing.image.filename &&
        oldListing.image.filename !== "default-image"
      ) {
        await cloudinary.uploader.destroy(oldListing.image.filename);
      }     

      //setting the new image
      updatedData.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      updatedData,
      { new: true }
    );

    if (!updatedListing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${updatedListing._id}`);
  } catch (error) {
    console.error("Updating Listing:", error);
    res.status(500).send("Internal Server Error");
  }
};



const deleteListing = async (req, res, next) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findByIdAndDelete(listingId); // Await the result

    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    req.flash("success", "Listing Deleted! ");
    res.redirect("/listings");
  } catch (error) {
    console.error("Deleting Listing:", error);
    res.status(500).send("Internal Server Error");
  }
};

const addUserForm = wrapAsync(async (req, res, next) => {
  res.render("users/add-user-form.ejs");
});

const addUser = wrapAsync(async (req, res, next) => {
  let { username, email, password } = req.body;
  const newUser = new User({ username, email });
  const registeredUser = await User.register(newUser, password);

  //console.log(registeredUser);

  req.login(registeredUser, (err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "New User Created! ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  });
});

const loginPage = (req, res, next) => {
  res.render("users/user-login.ejs");
};

const loginUser = (req, res) => {
  req.flash("success", "Welcome back champ !");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  //agar undefined hua ya pehle se hi logged in hai to /listings pe jayega login krne pe
  //console.log(redirectUrl);
  res.redirect(redirectUrl);
};

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "User Successfully Logged Out");
    res.redirect("/listings");
  });
};

export {
  showAllListings,
  showSingleListing,
  addListingForm,
  addListing,
  editListingForm,
  updateListing,
  deleteListing,
  addUserForm,
  addUser,
  loginPage,
  loginUser,
  logoutUser,
};

/*we use joi for server side validation
we will create a schema but this would be only for the purpose 
of validating the schema, that is the data coming from the clilent
side
*/
