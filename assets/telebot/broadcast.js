const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const dbPath = path.join(__dirname, './database/darwinireng.json');

// Fungsi untuk membaca ID chat dari file JSON
const readChatIds = () => {
  if (fs.existsSync(dbPath)) {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
  }
  return [];
};

// Fungsi untuk menyimpan ID chat ke file JSON
const saveChatIds = (chatIds) => {
  fs.writeFileSync(dbPath, JSON.stringify(chatIds, null, 2));
};

let chatIds = readChatIds(); // Membaca ID chat dari file saat bot dimulai

module.exports = (bot, availableCommands) => {
  const commandName = 'broadcast'; // Nama command yang didaftarkan
  availableCommands.push({ command: commandName, tags: ['all'] }); // Tambahkan commandName ke dalam daftar availableCommands dengan tags: search

  // Middleware untuk menyimpan ID chat
  bot.use((ctx, next) => {
    const chatId = ctx.chat.id;
    if (!chatIds.includes(chatId)) {
      chatIds.push(chatId); // Simpan ID chat jika belum ada
      saveChatIds(chatIds); // Simpan ID chat ke file JSON
    }
    return next();
  });

  // Command untuk broadcast
  bot.command(commandName, async (ctx) => {
    const message = ctx.message.text.split(' ').slice(1).join(' '); // Ambil pesan setelah command

    if (!message) {
      return ctx.reply('Silakan masukkan pesan yang ingin disiarkan setelah perintah.');
    }

    // Kirim pesan ke semua chat yang ada di chatIds
    for (const chatId of chatIds) {
      try {
        await bot.telegram.sendMessage(chatId, message);
      } catch (error) {
        console.error(`Gagal mengirim pesan ke chat ID ${chatId}:`, error);
      }
    }

    ctx.reply('Pesan broadcast telah dikirim ke semua chat.');
  });
};