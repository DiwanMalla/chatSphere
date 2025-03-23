const MessageInput = () => {
  return (
    <div>
      <form
        onSubmit={handleSendMessage}
        className="bg-gray-800 p-3 border-t border-gray-700 flex items-center gap-2"
      >
        <button
          type="button"
          className="p-2 text-gray-300 hover:text-teal-400 transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          name="message"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-full text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
          autoComplete="off"
        />
        <button
          type="submit"
          className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>{" "}
    </div>
  );
};

export default MessageInput;
