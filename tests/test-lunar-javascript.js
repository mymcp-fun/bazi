/**
 * 测试lunar-javascript包的API
 * 了解如何使用新的包来计算八字
 */

import { Solar } from 'lunar-javascript';

function testLunarJavaScript() {
    console.log('🔍 测试lunar-javascript包的API...\n');

    // 测试2006年1月28日23:50
    console.log('📅 测试时间：2006年1月28日23:50');

    try {
        // 创建Solar对象
        const solar = Solar.fromYmdHms(2006, 1, 28, 23, 50, 0);
        console.log('✅ Solar对象创建成功:', solar.toFullString());

        // 获取农历信息
        const lunar = solar.getLunar();
        console.log('✅ Lunar对象获取成功:', lunar.toFullString());

        // 获取八字信息
        const baZi = lunar.getEightChar();
        console.log('\n🎯 八字信息:');
        console.log('   年柱:', baZi.getYear());
        console.log('   月柱:', baZi.getMonth());
        console.log('   日柱:', baZi.getDay());
        console.log('   时柱:', baZi.getTime());
        console.log('   完整八字:', baZi.toString());

        // 测试其他有用的方法
        console.log('\n📊 其他信息:');
        console.log('   生肖:', lunar.getYearShengXiao());
        console.log('   星座:', solar.getXingZuo());
        console.log('   星期:', solar.getWeek());

        // 测试五行等信息
        console.log('\n🔍 详细分析:');

        // 获取年月日时的天干地支
        const yearGanZhi = lunar.getYearInGanZhi();
        const monthGanZhi = lunar.getMonthInGanZhi();
        const dayGanZhi = lunar.getDayInGanZhi();
        const timeGanZhi = lunar.getTimeInGanZhi();

        console.log('   年干支:', yearGanZhi);
        console.log('   月干支:', monthGanZhi);
        console.log('   日干支:', dayGanZhi);
        console.log('   时干支:', timeGanZhi);

    } catch (error) {
        console.error('❌ 测试失败:', error.message);
        console.error('完整错误:', error);
    }
}

// 测试2006年10月10日10:10对比之前的结果
function testComparisonCase() {
    console.log('\n\n🔍 对比测试：2006年10月10日10:10');

    try {
        const solar = Solar.fromYmdHms(2006, 10, 10, 10, 10, 0);
        const lunar = solar.getLunar();
        const baZi = lunar.getEightChar();

        console.log('📦 lunar-javascript结果:');
        console.log(`   四柱: ${baZi.getYear()} ${baZi.getMonth()} ${baZi.getDay()} ${baZi.getTime()}`);
        console.log(`   年柱: ${baZi.getYear()}`);
        console.log(`   月柱: ${baZi.getMonth()}`);
        console.log(`   日柱: ${baZi.getDay()}`);
        console.log(`   时柱: ${baZi.getTime()}`);

    } catch (error) {
        console.error('❌ 对比测试失败:', error.message);
    }
}

console.log('🚀 开始测试lunar-javascript包...\n');
testLunarJavaScript();
testComparisonCase(); 