// components/MessageInput.jsx
import React, { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send, Paperclip, Camera, Mic, X } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="bg-gray-800 border-t border-gray-700">
      {/* Attachment Previews */}
      {attachments.length > 0 && (
        <div className="p-3 flex flex-wrap gap-2 border-b border-gray-700">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative">
              {attachment.preview ? (
                <img
                  src={attachment.preview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                  {attachment.file.name}
                </div>
              )}
              <button
                onClick={() => removeAttachment(index)}
                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Form */}
      {/* <form
        onSubmit={handleSendMessage}
        className="p-3 flex items-center gap-2"
      >
        {/* Attachment Button /}
        <label className="p-2 text-gray-300 hover:text-teal-400 transition-colors cursor-pointer">
          <Paperclip className="w-5 h-5" />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            accept="image/*,video/*,.pdf"
            className="hidden"
          />
        </label>

        {/* Camera Button /}
        <button
          type="button"
          onClick={handleCameraCapture}
          className="p-2 text-gray-300 hover:text-teal-400 transition-colors"
        >
          <Camera className="w-5 h-5" />
        </button>

        {/* Audio Button /}
        <button
          type="button"
          onClick={handleAudioRecord}
          className="p-2 text-gray-300 hover:text-teal-400 transition-colors"
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Text Input /}
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-full text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
          autoComplete="off"
        />

        {/* Send Button /}
        <button
          type="submit"
          disabled={!message.trim() && attachments.length === 0}
          className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form> */}
    </div>
  );
};

export default MessageInput;
