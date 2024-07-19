import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//get user detail from frontend
//validation user data  - datafield is not empty
//check if user already exist :from user and email
//check for images,and avatar
//uploade them to cloudnary,avater
//create user object to send data to database
//create entry in entry in db
//remove password and refeseh token from response
//check for user  creation
// return res
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(
      409,
      "User already exists with the same username or email"
    );
  }

  // console.log("req.files:", req.files); // Log req.files to check the structure

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // const coverImageLocalPath;
  // if(req.files&&Array.isArray(req.files.coverImage)&& req.files.coverImage.length>0){
  //   coverImageLocalPath=req.files.coverImage[0].path
  // }

  // console.log("avatarLocalPath:", avatarLocalPath); // Log the avatar local path
  // console.log("coverImageLocalPath:", coverImageLocalPath); // Log the cover image local path

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  console.log(avatar, "cloude");
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar file");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
