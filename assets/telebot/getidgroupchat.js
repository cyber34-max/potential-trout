const fs = require('fs');
const path = require('path');

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

// Fungsi untuk menambahkan delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = (bot, availableCommands) => {
  const commandName = 'getidgroup'; // Nama command yang didaftarkan
  availableCommands.push({ command: commandName, tags: ['all'] }); // Tambahkan commandName ke dalam daftar availableCommands dengan tags: search

  bot.command(commandName, async (ctx) => {
    const chatId = ctx.chat.id;

    try {
      const membersCount = await bot.telegram.getChatMembersCount(chatId);
      const chatIds = readChatIds(); // Membaca ID chat yang sudah ada

      // Mengambil ID anggota grup
      for (let i = 0; i < membersCount; i++) {
        try {
          const member = await bot.telegram.getChatMember(chatId, i);
          if (member.user && member.user.id) {
            const memberId = member.user.id;
            if (!chatIds.includes(memberId)) {
              chatIds.push(memberId); // Tambahkan ID anggota jika belum ada
            }
          }
        } catch (error) {
          console.error(`Gagal mengambil informasi untuk anggota ke-${i}:`, error.message);
          // Anda bisa mengabaikan kesalahan ini dan melanjutkan ke anggota berikutnya
        }

        // Tambahkan delay setelah setiap permintaan
        await delay(1000); // Delay 1 detik (1000 ms)
      }

      saveChatIds(chatIds); // Simpan ID chat ke file JSON
      ctx.reply(`Berhasil mengambil dan menyimpan ID anggota grup. Total anggota: ${membersCount}`);
    } catch (error) {
      console.error('Gagal mengambil jumlah anggota grup:', error.message);
      ctx.reply('Terjadi kesalahan saat mengambil ID anggota grup.');
    }
  });
};