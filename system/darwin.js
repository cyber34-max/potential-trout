// CREATED BY DARWIN
require('../settings')
const util = require('util')
const path = require('path')
const yts = require('yt-search');
const axios = require('axios')
const { Telegraf } = require('telegraf');
const fetch = require('node-fetch')
const fs = require('fs');
const speed = require('performance-now')
// copas? taruh nama gw [ darwin ] fvck noob
const {
   spawn
} = require('child_process')

let isRunning = false
function start() {
    if (isRunning) return;
    isRunning = true;

    let args = [path.join(__dirname, '../alice/main.js'), ...process.argv.slice(2)];
    console.log([process.argv[0], ...args].join('\n'));

    let p = spawn(process.argv[0], args, {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    })
    .on('message', data => {
        if (data === 'reset') {
            console.log('Restarting Bot...');
            p.kill();
            start();
            delete p;
        } else if (data === null) {
            console.log('Received null code, restarting Bot...');
            p.kill();
            start();
            delete p;
        }
    })
    .on('exit', code => {
        console.error('Exited with code:', code);
        if (code === 0 || code === 1) {
            start();
        }
    });
}



// TELE BOT
const { config, saveConfig } = require('./addbottoken');
function initializeBot(name, token) {
const bot = new Telegraf(token);

const loadMenu = require('../assets/telebot/menu/telebotmenu');  // Import the menu module
// Load all features from the 'allfeature' directory
async function loadAllFeatures(bot) {
  const allFeaturesDir = path.join(__dirname, '../assets/telebot');
  const files = await fs.promises.readdir(allFeaturesDir);

  let availableCommands = [];

  for (const file of files) {
    if (file.endsWith('.js')) {
      const allFeaturePath = path.join(allFeaturesDir, file);
      try {
        const allFeature = require(allFeaturePath);
        allFeature(bot, availableCommands);
        console.log(`plugin ${file} loaded successfully.`);
      } catch (error) {
        console.error(`Failed to load plugin ${file}:`, error);
      }
    }
  }

  return availableCommands;
}

    // Load all features and handle commands
  loadAllFeatures(bot).then(availableCommands => {
      // Load menu commands from menu.js
    loadMenu(bot, availableCommands);
    // Addbot,listbot,deletebot function 
      bot.command('addbot', async (alice) => {
      const args = alice.message.text.split(' ');
      if (args.length < 3) {
        return alice.reply('Cara penggunaan fitur\n\n1. ambil token bot ada dari @botfather\n2. ketik /addbot dengan mengisi username dan tokennya\n3. jika sudah terdaftar, anda bisa menggunakan bot yang sudan anda daftarkan ✓\n\nexample : /addbot dalwingbot tokenxxxxxx');
      }

      const name = args[1];
      const token = args[2];
      config.bots.push({ name, token });
      saveConfig();

      initializeBot(name, token);
      alice.reply(`Bot ${name} telah ditambahkan dan dijalankan.`);
    });

    bot.command('listbot', (alice) => {
      if (config.bots.length === 0) {
        return alice.reply('Tidak ada bot yang terdaftar.');
      }

      let response = 'Daftar bot:\n';
      config.bots.forEach((bot, index) => {
        response += `${index + 1}. @${bot.name}\n`;
      });

      alice.reply(response);
    });

    bot.command('deletebot', (alice) => {
      const args = alice.message.text.split(' ');
      if (args.length < 2) {
        return alice.reply('Silakan masukkan nama bot yang ingin dihapus. Contoh: /deletebot <nama>');
      }

      const name = args[1];
      const botIndex = config.bots.findIndex(bot => bot.name === name);

      if (botIndex === -1) {
        return alice.reply(`Bot dengan nama ${name} tidak ditemukan.`);
      }

      config.bots.splice(botIndex, 1);
      saveConfig();

      alice.reply(`Bot ${name} telah dihapus.`);
    });

    // Launch the bot
    bot.launch()
      .then(() => {
        console.log(`Bot ${name} with token ${token} has started!`);
      })
      .catch(error => {
        console.error('Failed to start bot', error);
      });

  
  
const {
    simple
} = require('../lib/TeleFunc')



// Mendengarkan pesan
bot.on('message', (alice) => {

// Path ke file JSON
const dataFilePath = path.join(__dirname, '../assets/telebot/database', 'darwinireng.json');

    const chatId = alice.chat.id;
    const userId = alice.from.id;

    // Cek apakah file sudah ada
    let userData = [];
    if (fs.existsSync(dataFilePath)) {
        // Baca data dari file
        const fileData = fs.readFileSync(dataFilePath);
        userData = JSON.parse(fileData);
    }

    // Tambahkan ID pengguna jika belum ada
    if (!userData.includes(userId)) {
        userData.push(userId);
        // Simpan kembali ke file
        fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));
        console.log(`ID ${userId} saved to database`);
    }
    require("../system/darwin.js")(alice, bot)
});



// Logika unfuk fungsi alice
module.exports = alice = async (alice, bot) => {
    try {
const body = alice.message.text || alice.message.caption || ''
const budy = (typeof alice.message.text == 'string' ? alice.message.text : '')
const {
    isUrl
} = simple
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '' // di string '' kasih '.' sebelumnya, guna untuk hanya owner yang tidak mengenakan prefix dan pengguna lain menggunakan prefix titik
const isCmd = body.startsWith(prefix)
const isCreator = ownertele[0].replace("https://t.me/", '') == alice.update.message.from.username
const command = isCreator ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const user = simple.getUserName(alice.message.from)
const pushname = user.full_name;
const user_id = alice.message.from.id + " "
const username = alice.message.from.username ? alice.message.from.username : "DalwinOfficial";
const from = alice.message.chat.id

const isGroup = alice.chat.type.includes('group')
const groupName = isGroup ? alice.chat.title : ''

const isImage = alice.message.hasOwnProperty('photo')
const isVideo = alice.message.hasOwnProperty('video')
const isAudio = alice.message.hasOwnProperty('audio')
const isSticker = alice.message.hasOwnProperty('sticker')
const isContact = alice.message.hasOwnProperty('contact')
const isLocation = alice.message.hasOwnProperty('location')
const isDocument = alice.message.hasOwnProperty('document')
const isAnimation = alice.message.hasOwnProperty('animation')
const isMedia = isImage || isVideo || isAudio || isSticker || isContact || isLocation || isDocument || isAnimation
const quoted = alice.message.reply_to_message || {}
const isQuotedImage = quoted.hasOwnProperty('photo')
const isQuotedVideo = quoted.hasOwnProperty('video')
const isQuotedAudio = quoted.hasOwnProperty('audio')
const isQuotedSticker = quoted.hasOwnProperty('sticker')
const isQuotedContact = quoted.hasOwnProperty('contact')
const isQuotedLocation = quoted.hasOwnProperty('location')
const isQuotedDocument = quoted.hasOwnProperty('document')
const isQuotedAnimation = quoted.hasOwnProperty('animation')
const isQuoted = alice.message.hasOwnProperty('reply_to_message')
const timestampi = speed();
const latensii = speed() - timestampi

const reply = async (text) => {
    for (var x of simple.range(0, text.length, 4096)) { //maks 4096 character, jika lebih akan eror
        return await alice.replyWithMarkdown(text.substr(x, 4096), {
            disable_web_page_preview: true
        })
    }
}
const getStyle = (style_, style, style2) => {
    listt = `${lang.getStyle(style, style2)}`
    for (var i = 0; i < 300; i++) {
        listt += '» `' + style_[i] + '`\n'
    }
    reply(listt)
}

//get type message 
var typeMessage = body.substr(0, 50).replace(/\n/g, '')
if (isImage) typeMessage = 'Image'
else if (isVideo) typeMessage = 'Video'
else if (isAudio) typeMessage = 'Audio'
else if (isSticker) typeMessage = 'Sticker'
else if (isContact) typeMessage = 'Contact'
else if (isLocation) typeMessage = 'Location'
else if (isDocument) typeMessage = 'Document'
else if (isAnimation) typeMessage = 'Animation'



const dbPath = path.join(__dirname, '../assets/telebot/database/darwinireng.json');
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

  // Middleware untuk menyimpan ID chat
  bot.use((alice, next) => {
    const chatId = alice.chat.id;
    if (!chatIds.includes(chatId)) {
      chatIds.push(chatId); // Simpan ID chat jika belum ada
      saveChatIds(chatIds); // Simpan ID chat ke file JSON
    }
    return next();
  });

//Path ke file JSON untuk menyimpan ID anggota grup
const memberIdFilePath = path.join(__dirname, '../assets/telebot/database', 'darwinireng.json');

// Inisialisasi array untuk menyimpan ID anggota
let memberIds = [];

// Cek apakah file sudah ada dan baca data jika ada
if (fs.existsSync(memberIdFilePath)) {
    const fileData = fs.readFileSync(memberIdFilePath);
    memberIds = JSON.parse(fileData);
}
const chatType = alice.chat.type; // 'private', 'group', 'supergroup', 'channel'
const chatId = alice.chat.id;


// FUNCTION MONO SPACE FONT
function monospace(string) {
return '' + string + ''
}





// FUNCTION GAME BY WINN
if ((username in tebakanime)) {
let { soal, jawaban, hadiah, waktu } = tebakanime[username]
if (budy.toLowerCase() == "nyerah") {
reply(`KAMU PAYAH ಠ⁠﹏⁠ಠ\n\nJawabannya adalah : ${jawaban}`);
delete tebakanime[username];
clearTimeout(waktu);
} else if (body.toLowerCase().includes(jawaban)) {
reply(`JAWABAN BENAR\n\nPenebak : ${username}\nJawaban : ${jawaban}\nHadiah Saldo : Rp. 200`);
addSaldo(username, 200, db_saldo)
reply('jawaban benar 🟢')

clearTimeout(waktu);
delete tebakanime[username];
} else reply('salah ❌')
}
// Tebak Gambar
if ((username in tebakgambar)) {
let { soal, jawaban, hadiah, waktu } = tebakgambar[username]
if (budy.toLowerCase() == "nyerah") {
reply(`KAMU PAYAH ಠ⁠﹏⁠ಠ\n\nJawabannya adalah : ${jawaban}`);
delete tebakgambar[username];
clearTimeout(waktu);
} else if (body.toLowerCase().includes(jawaban)) {
reply(`JAWABAN BENAR\n\nPenebak : ${username}\nJawaban : ${jawaban}\nHadiah Saldo : Rp. 200`);
addSaldo(username, 200, db_saldo)
reply('jawaban benar 🟢')

clearTimeout(waktu);
delete tebakanime[username];
} else reply('salah ❌')
}
// END FUNC GAME

// SWITCH COMMAND WITH CASE
switch (command) {
case 'play':
case 'play':
case 'ytplay':
case 'ytdl':
reply('buy all fitur di @DalwinOfficial')
    break;
        case 'addmember': {
        if(!text) return reply('isi ID')
            
            // Menggunakan metode 'getChatMember' untuk memeriksa status anggota
            bot.telegram.getChatMember(chatId, text)
                .then((member) => {
                    if (member.status === 'left' || member.status === 'kicked') {
                        // Jika anggota tidak ada di grup, informasikan bahwa mereka sudah keluar
                        bot.telegram.sendMessage(chatId, `Pengguna dengan ID ${userId} sudah keluar dari grup.`);
                    } else {
                        bot.telegram.sendMessage(chatId, `Pengguna dengan ID ${userId} sudah menjadi anggota grup.`);
                    }
                })
                .catch((error) => {
                    // Jika pengguna tidak terdaftar, Anda bisa mengundang mereka
                    if (error.response && error.response.error_code === 400) {
                        bot.telegram.sendMessage(chatId, `Menambahkan pengguna dengan ID ${userId} ke grup...`);
                        // Catatan: Telegram API tidak memiliki metode langsung untuk menambahkan anggota
                        // Anda harus menggunakan metode lain seperti mengundang anggota melalui link
                    } else {
                        bot.telegram.sendMessage(chatId, `Gagal memeriksa status anggota: ${error.message}`);
                    }
                });
                }
            break;
case 'tebakgambar':
if (username in tebakgambar) return reply('Masih ada game yang belum diselesaikan');
var { img, jawaban, deskripsi } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/tebakgambar.json')));
console.log('Jawaban : '+jawaban)
var teks1 = `GAME TEBAK GAMBAR\n\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nDeskripsi: ${deskripsi}\nWaktu: ${gamewaktu} detik`
alice.replyWithPhoto({
                    url: img
                }, {
caption: teks1
})
tebakgambar[username] = {
soal: img,
jawaban: jawaban.toLowerCase(),
waktu: setTimeout(function () {
if (tebakgambar[username]) reply(`Waktu habis!\nJawabannya adalah: ${tebakgambar[username].jawaban}`);
delete tebakgambar[username];
}, gamewaktu * 1000)
}
break
case 'tebakanime':
if (username in tebakanime) return reply('Masih ada game yang belum diselesaikan');
var { image, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/tebakanime.json')));
console.log('Jawaban : '+jawaban)
var teks1 = `GAME TEBAK ANIME\n\nPetunjuk : ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nWaktu : ${gamewaktu} detik`
alice.replyWithPhoto({
                    url: image
                }, {
caption: teks1
})
tebakanime[username] = {
soal: image,
jawaban: jawaban.toLowerCase(),
waktu: setTimeout(function () {
if (tebakanime[username]) reply(`Waktu habis!\nJawabannya adalah: ${tebakanime[username].jawaban}`);
delete tebakanime[username];
}, gamewaktu * 1000)
}
break
case 'list-data':
            // Tampilkan semua ID anggota yang disimpan
            if (memberIds.length > 0) {
                bot.telegram.sendMessage(chatId, `Daftar ID anggota:\n${memberIds.join('\n')}`);
            } else {
                bot.telegram.sendMessage(chatId, 'Tidak ada ID anggota yang disimpan.');
            }
            break;
case 'save-id':
            // Simpan ID anggota jika chatType adalah 'group' atau 'supergroup'
            if (chatType === 'group' || chatType === 'supergroup') {
                try {
                    const admins = await alice.getChatAdministrators(chatId);
                    for (const admin of admins) {
                        const userId = admin.user.id;
                        if (!memberIds.includes(userId)) {
                            memberIds.push(userId);
                        }
                    }
                    // Simpan ID anggota ke file
                    fs.writeFileSync(memberIdFilePath, JSON.stringify(memberIds, null, 2));
                    bot.telegram.sendMessage(chatId, 'ID semua anggota grup telah disimpan!');
                } catch (error) {
                    console.error(error);
                    bot.telegram.sendMessage(chatId, 'Terjadi kesalahan saat mengambil ID anggota.');
                }
            } else {
                bot.telegram.sendMessage(chatId, 'Perintah ini hanya dapat digunakan di grup.');
            }
            break;
case 'clear-data':
            // Hapus database JSON
            try {
                fs.unlinkSync(memberIdFilePath);
                memberIds = []; // Reset array memberIds
                bot.telegram.sendMessage(chatId, 'Database ID anggota telah dihapus.');
            } catch (error) {
                console.error(error);
                bot.telegram.sendMessage(chatId, 'Terjadi kesalahan saat menghapus database.');
            }
            break;
case 'blackbox':
    if (!text) return reply('Input text untuk dipertanyakan');
    try {
        // Kirim permintaan ke Blackbox AI
        const response = await axios.post('https://api.blackbox.ai/respond', {
            message: text
        });
        const botResponse = response.data.response || 'Maaf, saya tidak mengerti.';
        reply(botResponse);
    } catch (error) {
        console.error('Error details:', error.message); // Menampilkan pesan kesalahan
        if (error.response) {
            // Jika ada respons dari server
            reply(`Kesalahan dari server: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
            // Jika permintaan dibuat tetapi tidak ada respons
            reply('Tidak ada respons dari server. Pastikan API dapat diakses.');
        } else {
            // Kesalahan lain
            reply('Terjadi kesalahan saat memproses permintaan: ' + error.message);
        }
    }
break;
default:           
if (body.startsWith('>')) {
alice.deleteMessage().catch(() => {});
if(!isCreator) return reply(`*[ System Notice ]* cannot access`)
try {
let evaled = await eval(body.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}
if (body.startsWith('$')){
alice.deleteMessage().catch(() => {});
if(!isCreator) return reply(`*[ System Notice ]* cannot access`)
qur = body.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) {
reply(stdout)
}
})
}
if (body.startsWith('<')) {
alice.deleteMessage().catch(() => {});
if(!isCreator) return reply(`*[ System Notice ]* cannot access`)
try {
return reply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
}
}

// akhir dari switch
}
    } catch (e) {
        alice.reply(util.format(e))
        console.log('[ ERROR ] ' + e)
    }
}

// akhir instalasi bot
});

  
  // Handle SIGINT and SIGTERM signals
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

// Initialize all bots from the config
config.bots.forEach(bot => initializeBot(bot.name, bot.token));
// END OF TELE BOT INDEX STARTER BY DARWIN

start()