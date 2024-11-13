// POWERED BY DARWIN SIGIT
const fs = require('fs')
const chalk=require('chalk')
const axios = require('axios');
const stringSimilarity = require("string-similarity");


// T.me/dalwinofficial

// MODULE
global.version = require('@whiskeysockets/baileys/package.json').version
global.baileys = require('@whiskeysockets/baileys') 

// UI BOT
global.botchar = 'alicia' // nama karakter bot anda
global.aliceversion = '[ v 2.3 ]' // versi bot
global.namebot = 'ALICE' // nama bot
global.packname = '© Powered By ' // watermark
global.namechannel = 'PROJECT ALICEZATION' // your WhatsApp channel name
global.idgc = "120363332208740196@g.us" // opsional ID group, ubah jika bisa
global.idsal = "120363344309007219@newsletter" // opsional ID channel, ubah jika bisa
global.autodeletemessagebot = 60000 // hapus pesan yang sudah di kirim bot ( 1000 = 1 detik )

// TELE BOT SET
global.idowner = '7901587980' // isi ID telegram anda, ambil ID di t.me/myidbot
global.idgroup = '' // opsional, isi ID dengan id group/channel anda
global.userowner = '@enjoy_energy1' // isi dengan username telegram anda
global.tokenwin = '' // isi dengan token bot anda, buat token di t.me/botfather
global.nameongner = 'King fury' // isi dengan nama anda
global.ownertele = ["https://t.me/enjoy_energy1", "https://t.me/enjoy_energy1"] // pastikan username sudah sesuai agar fitur khusus owner bisa di pakai


// CREATOR OPTION
global.namaownernya = 'fury' // owner name
global.author = 'thaifuri' // your name
global.sessionName = 'seson' // dont change, this your session
global.owner = '6281918041732@s.whatsapp.net' // akses owner
global.owner2 = '6281918041732' // nomor owner
global.email = 'fury@gmail.com' // optional

// SETTING PAIRING KODE BY DARWIN
global.usePairingCode = true
global.pairingNumber = '6281918041732'

// SOCIAL MEDIA URL
global.group = 'https://chat.whatsapp.com/G6VyIzDhM3HCydXFPI3weu' // url WhatsApp group
global.saluran = 'https://whatsapp.com/channel/0029Vaqf1TF30LKNJw1A5V3g' // url WhatsApp channel
global.youtube = 'https://youtube.com/@BG-DARWIN' // url YouTube 
global.instagram = 'https://instagram.com/memek/' // url Instagram 

// SETTING BOT
global.prefix = ['.']
global.autoreact = false
global.public = false //true untuk public
global.autoreadsw = true // meneruskan status dari nomor bot
global.autoread = true // auto baca pesan pengguna
global.chatgpt = false // auto chat gpt, only private chat
global.simisimi = false // auto simi reply
global.welcome = false // sistem welcome group otomatis
global.onlygc = false // fungsi hanya untuk group chat
global.onlypc = false // fungsi hanya untuk private chat
global.game = true // guna agar command game bisa dimatikan/diaktifkan
global.autoreject = true // auto reject panggilan bot
global.antilink = true // antilink, hapus semua pesan berupa link
global.antiSpam = true // belum di beri fungsi
global.antibot = true // belum di beri fungsi
global.autojoin = true  // mode jelajah, bergabung otomatis tanpa command
global.boostgc = false // jumlah member dengan title group secara real time
global.autodel = false // hapus semua tipe pesan otomatis gc/pc
global.autodonlod = false // guna download file tanpa command awal
global.autoTyping = true // composing mengetik saat melakukan perintah
global.pengingat = false // notif sistem otomatis
global.tekspushkonv2 = '' // gunakan teks ini jika user tidak mengisi teks
global.select = 1 // opsi pilihan untuk polling bot

// RESPON AKSES
global.mess = {
sukses: '*[ Loaded Success ]*',
admin: '*[ System Notice ]* for *admin!* not *npc*',
botAdmin: '*[ System Notice ]* please add bot *admin*',
owner: '*[ System Access Failed ]* Access Denied',
group: '*[ System Notice ]* Use this in group chat!',
private: '*[ System Notice ]* Use this in private chat!',
bot: '*[ System Notice ]* Only Bot user',
error: '*[ System Failed ]* Error, please contact the owner',
wait: '*[ Loading ]* Please Wait',
prem: '*[ System Notice ]* this only premium user'
}

// THUMBNAIL BOT
global.ppkosong = 'https://telegra.ph/file/98aa5b8b01f53877824c3.jpg'
global.trash = fs.readFileSync('./Procfile')
global.thumb = fs.readFileSync('./assets/sticker/alice.png')
// thumbnail url, change if u can
global.tamnel = [
'https://telegra.ph/file/9311b3f8c35f127dd1537.jpg',
'https://pomf2.lain.la/f/81fj0ey4.jpeg',
'https://pomf2.lain.la/f/lzho452q.jpg',
'https://pomf2.lain.la/f/fx8qh0by.webp',
'https://pomf2.lain.la/f/1s1qs5p.webp',
]
// thumbnail mp4/gift
global.gifttamnel = [
// alice zuberg
'https://pomf2.lain.la/f/ikin5aoa.mp4',
// girl cryng
'https://pomf2.lain.la/f/p07nvv2q.mp4',
// lady samurai
'https://pomf2.lain.la/f/56p6tek.mp4',
// saber fate
'https://pomf2.lain.la/f/nleq7wrq.mp4',
]

// logo reply alice, gunakan base64, jangan ubah bila tidak paham
global.base64 = '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'




// PANEL SETTING
// app log, change if u have
global.applog = 'apy.pw/dalwingshop'
// domain panel
global.domain = 'https://darwin-yesus.com' // isi domain panel anda
// pltc key
global.apicred = ''
// plta key
global.apiuser = ''
global.eggsnya = '15' // id eggs yang dipakai
global.location = '1' // id location



// SETTING APIKEY OPENAI & FILESTACK
global.fileStackApi = `AK5imWKw4QMeyD0g2ij2oz` // opsional - daftar di filestack

// APIKEY
global.skyzo = `refan`
global.lolkey = 'GataDios'
global.zeeone = `QIO8xicLNkEV43Y`

// SETTING GAME
global.gamewaktu = 60 // Game waktu
global.bmin = 1000 // Balance minimal 
global.bmax = 3000 // Balance maksimal
global.limit = 15 // Set limit
global.limitawal = {
premium: "Infinity",
free: 8000,
monayawal: 1000
}

// SETTING RPG
global.rpg = { // Bebas ubah value/angka
darahawal: 100,
besiawal: 15,
goldawal: 10,
emeraldawal: 5,
umpanawal: 5,
potionawal: 1
}
// DATABASE GAME
global.suit = {};
global.tictactoe = {};
global.petakbom = {};
global.kuis = {};
global.siapakahaku = {};
global.asahotak = {};
global.susunkata = {};
global.caklontong = {};
global.family100 = {};
global.tebaklirik = {};
global.tebaklagu = {};
global.tebakgambar = {};
global.tebakkimia = {};
global.tebakkata = {};
global.tebakkalimat = {};
global.tebakbendera = {};
global.tebakanime = {};
global.kuismath = {};

// GLOBAL MIMETYPE
global.doc1 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.doc2 = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.doc3 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.doc4 = 'application/zip'
global.doc5 = 'application/pdf'
global.doc6 = 'application/vnd.android.package-archive'

// HOOKER STRING FONT
global.similarity = (one,two) => similarity(one,two);
global.transformText = transformText
global.transformText2 = transformText2
global.transformText3 = transformText3



// FUNCTION FONT STRING
async function similarity(one,two) {
const treshold = stringSimilarity.compareTwoStrings(one, two)
return treshold.toFixed(2)
}

function transformText2(text) {
const charMap = {
'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
'0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'};
return text.split('').map(char => {
return charMap[char.toUpperCase()] || char;
}).join(' ');}

function transformText3(text) {
  const charMap = {
    'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
    'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
    'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
    '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
  };
  return text.toUpperCase().split('').map(char => {
    return charMap[char] || char;
  }).join(' ');
}

function transformText(text) {
const charMap = {
'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ'};

return text.toUpperCase().split('').map(char => {
return charMap[char] || char;
}).join('');}
      
// RELOAD FILE UPDATE
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
