require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');

// --- CẤU HÌNH ---
const CHANNEL_WELCOME_ID = '1462326285278904322'; 
const CHANNEL_RULES_ID = '1462326285278904323';   

// Đã sửa: Thêm https:// vào trước link logo để bot đọc được ảnh
const LOGO_URL = 'https://hopvan.netlify.app/logo.webp'; 
const BANNER_URL = 'https://hopvan.netlify.app/Panel.png'; 
// ----------------

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

// 1. SỰ KIỆN BOT ONLINE
client.once('ready', () => {
    console.log(`✅ Bot ${client.user.tag} đã sẵn sàng!`);
    client.user.setPresence({
        activities: [{ name: 'hopvan.netlify.app', type: ActivityType.Watching }],
        status: 'online',
    });
});

// 2. SỰ KIỆN THÀNH VIÊN MỚI (WELCOME)
client.on('guildMemberAdd', async (member) => {
    const channel = member.guild.channels.cache.get(CHANNEL_WELCOME_ID);
    if (!channel) return;

    const welcomeEmbed = new EmbedBuilder()
        .setColor(0xFF8F50)
        .setAuthor({ name: 'HOPVAN', iconURL: LOGO_URL })
        .setTitle('CHÀO MỪNG BẠN ĐÃ ĐẾN VỚI HOPVAN')
        .setDescription(`
Chào mừng ${member} đã đến với HOPVAN - Nền Tảng Học & Luyện Thi Ngữ Văn.

Mời bạn vào <#${CHANNEL_RULES_ID}> để đọc kỹ luật lệ của server.

Bạn là thành viên thứ **${member.guild.memberCount}**.
        `)
        .setThumbnail(LOGO_URL)
        .setImage(BANNER_URL)
        .setTimestamp();

    try {
        await channel.send({  
            embeds: [welcomeEmbed] 
        });
    } catch (error) {
        console.error('❌ Lỗi welcome:', error);
    }
});

// 3. SỰ KIỆN TIN NHẮN (LỆNH !HOPVAN)
client.on('messageCreate', async (message) => {
    // Bỏ qua tin nhắn của bot
    if (message.author.bot) return;

    // Kiểm tra lệnh !hopvan
    if (message.content.toLowerCase() === '!hopvan') {
        
        // Tạo Embed giới thiệu đẹp
        const introEmbed = new EmbedBuilder()
            .setColor(0xFF8F50) // Màu cam Hopvan
            .setTitle('🌟 GIỚI THIỆU VỀ HOPVAN')
            .setDescription(`
**Hopvan** là trạm tri thức dành riêng cho những tâm hồn yêu văn chương, nơi cung cấp các tài liệu và công cụ hỗ trợ học tập Ngữ Văn hiệu quả.

👉 **Truy cập ngay:** [hopvan.netlify.app](https://hopvan.netlify.app)
            `)
            .addFields(
                { name: '📚 Tài liệu', value: 'Kho tàng kiến thức văn học phong phú.', inline: true },
                { name: '🤖 AI Hỗ trợ', value: 'Công cụ AI chấm bài và gợi ý ý tưởng.', inline: true },
                { name: '💬 Cộng đồng', value: 'Giao lưu với các sĩ tử trên toàn quốc.', inline: true }
            )
            .setThumbnail(LOGO_URL)
            .setFooter({ text: 'Designed by Hopvan Team © 2026', iconURL: LOGO_URL });

        // Gửi tin nhắn trả lời
        await message.reply({ embeds: [introEmbed] });
    }
});

client.login(process.env.TOKEN);