#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { MCPBaziService } from './bazi-service.js';
import { BaziToolInput } from './types.js';

/**
 * MCP八字服务器类
 */
class MCPBaziServer {
    private server: Server;
    private baziService: MCPBaziService;

    constructor() {
        // 初始化MCP服务器
        this.server = new Server(
            {
                name: '@mymcp-fun/bazi',
                version: '1.0.0',
                description: '专业的八字计算MCP服务器 - 基于TypeScript重构，一行命令即可使用'
            },
            {
                capabilities: {
                    tools: {}
                }
            }
        );

        // 初始化八字服务
        this.baziService = new MCPBaziService();

        // 设置工具处理器
        this.setupToolHandlers();
    }

    /**
     * 设置MCP工具处理器
     */
    private setupToolHandlers(): void {
        // 注册工具列表
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [{
                name: 'get_bazi_details',
                description: '计算生辰八字和五行信息。输入出生年月日时，返回四柱、五行、生肖等完整的八字分析。',
                inputSchema: {
                    type: 'object',
                    properties: {
                        year: {
                            type: 'number',
                            description: '出生年份 (1900-2100)',
                            minimum: 1900,
                            maximum: 2100
                        },
                        month: {
                            type: 'number',
                            description: '出生月份 (1-12)',
                            minimum: 1,
                            maximum: 12
                        },
                        day: {
                            type: 'number',
                            description: '出生日期 (1-31)',
                            minimum: 1,
                            maximum: 31
                        },
                        hour: {
                            type: 'number',
                            description: '出生时间 (0-23时)',
                            minimum: 0,
                            maximum: 23
                        },
                        gender: {
                            type: 'string',
                            enum: ['male', 'female'],
                            description: '性别，默认为male'
                        },
                        timezone: {
                            type: 'string',
                            description: '时区，默认为Asia/Shanghai',
                            default: 'Asia/Shanghai'
                        }
                    },
                    required: ['year', 'month', 'day', 'hour'],
                    additionalProperties: false
                }
            }]
        }));

        // 处理工具调用
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            if (request.params.name === 'get_bazi_details') {
                try {
                    const input = request.params.arguments as unknown as BaziToolInput;
                    const result = await this.baziService.calculateBazi(input);

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

            throw new Error(`未知工具: ${request.params.name}`);
        });

        // 添加错误处理
        this.server.onerror = (error) => {
            console.error('MCP服务器错误:', error);
        };
    }

    /**
     * 启动服务器
     */
    async run(): Promise<void> {
        try {
            const transport = new StdioServerTransport();
            await this.server.connect(transport);

            // 输出到stderr，避免与MCP协议冲突
            console.error('🔮 MCP八字服务器已启动');
            console.error('📊 版本: 1.0.0 (TypeScript重构版)');
            console.error('⚡ 准备接收八字计算请求...');

        } catch (error) {
            console.error('服务器启动失败:', error);
            process.exit(1);
        }
    }
}

/**
 * 主函数 - 启动服务器
 */
async function main() {
    try {
        const server = new MCPBaziServer();
        await server.run();
    } catch (error) {
        console.error('服务器启动失败:', error);
        process.exit(1);
    }
}

// 直接运行时启动服务器
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
} 