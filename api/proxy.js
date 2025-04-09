// api/proxy.js

export default async function handler(req, res) {
  // 从 query 中获取 address
  const { address } = req.query;

  // 如果你想要支持更多 query 参数，可以在此根据需要拆解
  // 比如: const otherParam = req.query.otherParam; 等等

  // 拼出后端接口地址
  const remoteUrl = `https://app.wavex.fi/api/rewards?address=${address}`;

  try {
    // 发起请求到真正的后端接口
    const response = await fetch(remoteUrl);
    const data = await response.json();

    // 设置跨域头，让浏览器不拦截
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 成功时返回200，并把后端返回的JSON直接转发给前端
    res.status(200).json(data);
  } catch (error) {
    // 若请求或解析出错，返回500
    res.status(500).json({ error: error.toString() });
  }
}
