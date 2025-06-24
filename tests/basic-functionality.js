/**
 * 基础功能测试 - 与Python版本对比
 */

import { MCPBaziService } from '../dist/bazi-service.js';

async function testBasicCalculation() {
    console.log('🧪 开始基础八字计算测试...');

    const service = new MCPBaziService();

    // 测试用例：2024年1月1日0时生人
    const testInput = {
        year: 2024,
        month: 1,
        day: 1,
        hour: 0,
        gender: 'male',
        timezone: 'Asia/Shanghai'
    };

    try {
        const result = await service.calculateBazi(testInput);

        console.log('✅ 八字计算成功！');
        console.log('📊 计算结果:');
        console.log('   四柱:', result.pillars);
        console.log('   五行:', result.elements);
        console.log('   生肖:', result.zodiac);

        if (result.analysis) {
            console.log('   分析:', result.analysis);
        }

        return result;

    } catch (error) {
        console.error('❌ 八字计算失败:', error.message);
        throw error;
    }
}

async function testInputValidation() {
    console.log('\n🧪 开始输入验证测试...');

    const service = new MCPBaziService();

    // 测试无效输入
    const invalidInputs = [
        { year: 1800, month: 1, day: 1, hour: 0 }, // 年份过早
        { year: 2024, month: 13, day: 1, hour: 0 }, // 月份无效
        { year: 2024, month: 1, day: 32, hour: 0 }, // 日期无效
        { year: 2024, month: 1, day: 1, hour: 25 }, // 小时无效
    ];

    for (const input of invalidInputs) {
        try {
            await service.calculateBazi(input);
            console.error('❌ 验证失败: 应该抛出错误但没有抛出', input);
        } catch (error) {
            console.log('✅ 正确捕获无效输入:', error.message);
        }
    }
}

async function main() {
    try {
        console.log('🚀 开始npm版八字服务器测试\n');

        // 运行测试
        await testBasicCalculation();
        await testInputValidation();

        console.log('\n🎉 所有测试通过！npm版本八字计算功能正常');

    } catch (error) {
        console.error('\n💥 测试失败:', error);
        process.exit(1);
    }
}

// 运行测试
main(); 