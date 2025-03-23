import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar", error);
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages", error);
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { text, images } = req.body;
    const { id: receiverId } = req.params;
    const myId = req.user._id;
    let imageUrl = [];
    if (images && images.length > 0) {
      //upload base64 images to cloudinary
      for (const base64 of images) {
        const uploadedResponse = await cloudinary.uploader.upload(base64, {
          folder: "messages",
        });
        imageUrl.push(uploadedResponse.secure_url);
      }
    }
    const newMessage = await Message.create({
      senderId: myId,
      receiverId,
      text: text || "", // Ensure text is an empty string if not provided
      images: imageUrl.length > 0 ? imageUrl : undefined, // Only include images if there are any
    });
    await newMessage.save();

    //todo: realtime functionality goes here => socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};
