export default async function handler(req, res) {
  const serverIp = 'http://194.45.197.156:30120';

  try {
    // جلب معلومات اللاعبين
    const [playersRes, infoRes] = await Promise.all([
      fetch(`${serverIp}/players.json`),
      fetch(`${serverIp}/info.json`)
    ]);

    // التحقق من استجابة السيرفر
    if (!playersRes.ok || !infoRes.ok) {
      throw new Error('Failed to fetch from FiveM server');
    }

    const players = await playersRes.json();
    const info = await infoRes.json();

    // إرسال البيانات للفرونت
    return res.status(200).json({
      status: 'online',
      playersCount: players.length,
      players,
      server: info
    });

  } catch (err) {
    return res.status(200).json({
      status: 'offline',
      playersCount: 0,
      players: [],
      error: err.message
    });
  }
}
