/**
 * 测试MCP服务器功能
 * 模拟MCP客户端调用
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function testMCPServer() {
    console.log('🚀 启动MCP服务器测试...\n');

    const serverPath = join(__dirname, '../dist/server.js');
    console.log('📁 服务器路径:', serverPath);

    const server = spawn('node', [serverPath], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    server.on('error', (error) => {
        console.error('❌ 服务器启动错误:', error);
    });

    server.stderr.on('data', (data) => {
        console.log('📟 服务器日志:', data.toString());
    });

    // 发送初始化请求
    setTimeout(() => {
        console.log('📤 发送初始化请求...');
        const initRequest = {
            jsonrpc: '2.0',
            id: 1,
            method: 'initialize',
            params: {
                protocolVersion: '2024-11-05',
                capabilities: {},
                clientInfo: {
                    name: 'test-client',
                    version: '1.0.0'
                }
            }
        };

        server.stdin.write(JSON.stringify(initRequest) + '\n');
    }, 1000);

    // 发送工具列表请求
    setTimeout(() => {
        console.log('📤 发送工具列表请求...');
        const toolsListRequest = {
            jsonrpc: '2.0',
            id: 2,
            method: 'tools/list',
            params: {}
        };

        server.stdin.write(JSON.stringify(toolsListRequest) + '\n');
    }, 2000);

    // 发送八字计算请求
    setTimeout(() => {
        console.log('📤 发送八字计算请求 (2006-01-28 23:50)...');
        const baziRequest = {
            jsonrpc: '2.0',
            id: 3,
            method: 'tools/call',
            params: {
                name: 'get_bazi_details',
                arguments: {
                    year: 2006,
                    month: 1,
                    day: 28,
                    hour: 23
                }
            }
        };

        server.stdin.write(JSON.stringify(baziRequest) + '\n');
    }, 3000);

    // 发送第二个八字计算请求
    setTimeout(() => {
        console.log('📤 发送八字计算请求 (2006-10-10 10:10)...');
        const baziRequest2 = {
            jsonrpc: '2.0',
            id: 4,
            method: 'tools/call',
            params: {
                name: 'get_bazi_details',
                arguments: {
                    year: 2006,
                    month: 10,
                    day: 10,
                    hour: 10
                }
            }
        };

        server.stdin.write(JSON.stringify(baziRequest2) + '\n');
    }, 4000);

    // 接收服务器响应
    server.stdout.on('data', (data) => {
        const lines = data.toString().split('\n').filter(line => line.trim());

        lines.forEach(line => {
            try {
                const response = JSON.parse(line);
                console.log('\n📥 收到响应:');
                console.log('ID:', response.id);

                if (response.result) {
                    if (response.result.tools) {
                        console.log('🛠️ 工具列表:', response.result.tools.map(t => t.name));
                    } else if (response.result.content) {
                        console.log('🎯 八字结果:');
                        const resultText = response.result.content[0].text;
                        const baziData = JSON.parse(resultText);
                        console.log(`   四柱: ${baziData.pillars.year} ${baziData.pillars.month} ${baziData.pillars.day} ${baziData.pillars.hour}`);
                        console.log(`   生肖: ${baziData.animal}`);
                        console.log(`   星座: ${baziData.constellation}`);
                        if (baziData.lunarDate) {
                            console.log(`   农历: ${baziData.lunarDate.year}年${baziData.lunarDate.month}月${baziData.lunarDate.day}日`);
                        }
                    } else {
                        console.log('✅ 初始化成功');
                    }
                } else if (response.error) {
                    console.error('❌ 错误响应:', response.error);
                } else {
                    console.log('📋 响应:', JSON.stringify(response, null, 2));
                }
            } catch (error) {
                console.log('📄 原始数据:', line);
            }
        });
    });

    // 5秒后关闭服务器
    setTimeout(() => {
        console.log('\n🔚 测试完成，关闭服务器...');
        server.kill();
        process.exit(0);
    }, 6000);
}

testMCPServer(); 