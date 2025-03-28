import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $new: loggedInUserId },
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
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const myId = req.user._id;
    let imageUrl;
    if (image) {
      //upload base64 image to cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        folder: "messages",
      });
      imageUrl = uploadedResponse.secure_url;
    }
    const newMessage = await Message.create({
      senderId: myId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    //todo: realtime functionality goes here => socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(400).json({ message: `Error: ${error.message}` });
  }
};
