#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { MCPBaziService } from './bazi-service.js';

/**
 * 创建并配置MCP八字服务器
 */
const createBaziServer = (): McpServer => {
    const server = new McpServer({
        name: '@mymcp-fun/bazi',
        version: '2.0.1',
        description: '专业的八字计算MCP服务器 - 基于TypeScript重构，一行命令即可使用'
    });

    // 初始化八字服务
    const baziService = new MCPBaziService();

    // 注册八字计算工具
    server.registerTool(
        'get_bazi_details',
        {
            title: '八字计算器',
            description: '计算生辰八字和五行信息。输入出生年月日时，返回四柱、五行、生肖等完整的八字分析。',
            inputSchema: {
                year: z.number()
                    .min(1900, '年份不能早于1900年')
                    .max(2100, '年份不能晚于2100年')
                    .describe('出生年份 (1900-2100)'),
                month: z.number()
                    .min(1, '月份必须在1-12之间')
                    .max(12, '月份必须在1-12之间')
                    .describe('出生月份 (1-12)'),
                day: z.number()
                    .min(1, '日期必须在1-31之间')
                    .max(31, '日期必须在1-31之间')
                    .describe('出生日期 (1-31)'),
                hour: z.number()
                    .min(0, '小时必须在0-23之间')
                    .max(23, '小时必须在0-23之间')
                    .describe('出生时间 (0-23时)'),
                gender: z.enum(['male', 'female'])
                    .optional()
                    .default('male')
                    .describe('性别，默认为male'),
                timezone: z.string()
                    .optional()
                    .default('Asia/Shanghai')
                    .describe('时区，默认为Asia/Shanghai')
            }
        },
        async (args) => {
            try {
                const result = await baziService.calculateBazi(args);

                return {
                    content: [{
                        type: 'text' as const,
                        text: JSON.stringify(result, null, 2)
                    }]
                };
            } catch (error) {
                // 错误处理
                const errorMessage = error instanceof Error ? error.message : '未知错误';

                return {
                    content: [{
                        type: 'text' as const,
                        text: JSON.stringify({
                            error: {
                                code: 'CALCULATION_FAILED',
                                message: errorMessage,
                                details: error
                            }
                        }, null, 2)
                    }],
                    isError: true
                };
            }
        }
    );

    return server;
};

/**
 * 主函数 - 启动MCP八字服务器
 */
async function main() {
    try {
        const server = createBaziServer();
        const transport = new StdioServerTransport();

        await server.connect(transport);

        // 输出到stderr，避免与MCP协议冲突
        console.error('🔮 MCP八字服务器已启动');
        console.error('📊 版本: 2.0.1 (新版API重构)');
        console.error('⚡ 准备接收八字计算请求...');

    } catch (error) {
        console.error('服务器启动失败:', error);
        process.exit(1);
    }
}

// 启动MCP服务器
main(); 