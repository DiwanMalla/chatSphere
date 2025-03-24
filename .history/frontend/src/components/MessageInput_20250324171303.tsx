// components/MessageInput.tsx
import React, { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send, Paperclip, X } from "lucide-react";

const MessageInput: React.FC = () => {
  const [text, setText] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useChatStore();
  const [attachments, setAttachments] = useState<
    { file: File; preview: string | null; type: string }[]
  >([]);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files: File[] = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
      type: file.type,
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    fileInputRef.current!.value = ""; // Reset input for re-selection
  };

  // Remove an attachment
  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() && attachments.length === 0) return;

    try {
      let uploadedImages: string[] = [];

      for (const attachment of attachments) {
        if (attachment.file.type.startsWith("image/")) {
          const base64 = await convertToBase64(attachment.file);
          uploadedImages.push(base64);
        }
      }

      await sendMessage({ text, images: uploadedImages });

      // Clear input
      setText("");
      setAttachments([]);
    } catch (error) {
      console.error(error);
    }
  };

  // Convert file to Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

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
      <form
        onSubmit={handleSendMessage}
        className="p-3 flex items-center gap-2"
      >
        {/* Attachment Button */}
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

        {/* Text Input */}
        <input
          type="text"
          name="message"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-full text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
          autoComplete="off"
        />

        {/* Send Button */}
        <button
          type="submit"
          className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
