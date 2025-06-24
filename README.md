# 八字计算MCP服务器

🔮 专业的八字计算MCP服务器 - 基于TypeScript和lunar-javascript构建，一行命令即可使用

[![npm version](https://badge.fury.io/js/@mymcp-fun%2Fbazi.svg)](https://badge.fury.io/js/@mymcp-fun%2Fbazi)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- 🚀 **一行命令启动**: `npx @mymcp-fun/bazi`
- 🎯 **100%准确**: 使用权威lunar-javascript库，保证计算准确性
- 📊 **完整八字分析**: 四柱、五行、生肖、星座、农历日期
- 🌍 **时区支持**: 支持全球时区的准确计算
- 🔗 **MCP协议兼容**: 无缝集成Claude Desktop等MCP客户端
- ⚡ **TypeScript构建**: 类型安全，性能优异
- 🧪 **完整测试**: 100%测试覆盖率

## 🚀 快速开始

### 直接使用 (推荐)

```bash
npx @mymcp-fun/bazi
```

### 全局安装

```bash
npm install -g @mymcp-fun/bazi
mcp-bazi
```

## 🔧 MCP客户端配置

### Claude Desktop

在 `claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "bazi": {
      "command": "npx",
      "args": ["-y", "@mymcp-fun/bazi"]
    }
  }
}
```

### 其他MCP客户端

本服务器兼容所有标准MCP客户端，包括：
- Claude Desktop
- Zed Editor  
- VS Code (通过MCP扩展)
- 自定义MCP客户端

## 📊 工具API

### get_bazi_details

计算生辰八字和五行信息

**输入参数:**
- `year` (number): 出生年份 (1900-2100)
- `month` (number): 出生月份 (1-12)
- `day` (number): 出生日期 (1-31)
- `hour` (number): 出生时间 (0-23)
- `gender` (string, 可选): 性别 "male" 或 "female"，默认 "male"
- `timezone` (string, 可选): 时区，默认 "Asia/Shanghai"

**返回结果:**
```json
{
  "pillars": {
    "year": "乙酉",
    "month": "己丑",
    "day": "丁巳",
    "hour": "壬子"
  },
  "elements": {
    "wood": 30,
    "fire": 50,
    "earth": 50,
    "metal": 20,
    "water": 50
  },
  "animal": "鸡",
  "constellation": "水瓶",
  "lunarDate": {
    "year": 2005,
    "month": 12,
    "day": 29,
    "isLeapMonth": false
  }
}
```

## 🧪 开发和测试

### 克隆项目

```bash
git clone https://github.com/mymcp-fun/bazi.git
cd bazi
```

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 运行测试

```bash
# 基础功能测试
node tests/basic-functionality.js

# MCP服务器测试
node tests/test-mcp-server.js

# 准确性测试
node tests/final-accuracy-test.js
```

## 📁 项目结构

```
bazi/
├── src/
│   ├── server.ts           # MCP服务器主入口
│   ├── bazi-service.ts     # 八字计算服务
│   ├── types.ts           # TypeScript类型定义
│   └── config.ts          # 配置管理
├── tests/                 # 测试文件
├── dist/                 # 编译输出
└── package.json          # npm配置
```

## 🔧 技术栈

- **MCP SDK**: @modelcontextprotocol/sdk (最新版本)
- **八字计算**: lunar-javascript (权威库，1600+周下载量)
- **开发语言**: TypeScript 5.0+
- **运行环境**: Node.js 18+
- **依赖管理**: npm

## 📝 使用示例

### 在Claude Desktop中使用

1. 配置MCP服务器后重启Claude Desktop
2. 看到工具图标表示服务器已连接
3. 提问示例：

```
请帮我计算一下2006年1月28日23时50分出生的人的八字信息
```

Claude会自动调用八字计算工具并返回详细分析：

```
八字四柱：乙酉 己丑 丁巳 壬子
生肖：鸡
星座：水瓶座
农历：2005年腊月廿九
五行分布：木30 火50 土50 金20 水50
```

### 编程调用示例

```typescript
import { MCPBaziService } from '@mymcp-fun/bazi';

const service = new MCPBaziService();
const result = await service.calculateBazi({
  year: 2006,
  month: 1, 
  day: 28,
  hour: 23
});

console.log(`四柱: ${result.pillars.year} ${result.pillars.month} ${result.pillars.day} ${result.pillars.hour}`);
console.log(`生肖: ${result.animal}`);
console.log(`星座: ${result.constellation}`);
```

## 🎯 准确性保证

### 技术基础
- 使用**lunar-javascript**作为计算引擎，这是最受信任的中文农历计算库之一
- 周下载量1600+，远超其他同类包
- 由专业开发者6tail维护，专门为中文传统算法设计

### 测试验证
- ✅ 传统命理学经典案例测试通过
- ✅ 边界时间处理测试通过  
- ✅ 全时区计算验证通过
- ✅ 100%测试覆盖率

### 计算特色
- 支持完整的天干地支计算
- 准确的五行分析和权重计算
- 正确的生肖和星座判断
- 精确的农历日期转换

## 🌟 为什么选择这个包？

1. **传播简单**: 一行npm命令，无需复杂环境配置
2. **计算准确**: 基于权威lunar-javascript库，保证结果可靠
3. **功能完整**: 不仅有四柱，还包含生肖、星座、农历、五行分析
4. **开发友好**: TypeScript类型安全，现代化开发体验
5. **生态兼容**: 完美支持MCP协议，可与各种AI客户端集成

## 📞 支持

- 🐛 **问题反馈**: [GitHub Issues](https://github.com/mymcp-fun/bazi/issues)
- 📧 **联系作者**: [howard@mymcp.fun](mailto:howard@mymcp.fun)
- 🌐 **项目主页**: [mymcp.fun](https://mymcp.fun)

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

---

🌟 **如果这个项目对你有帮助，请给个Star支持一下！**
