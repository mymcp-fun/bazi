// @ts-ignore
import { Solar } from 'lunar-javascript';
import { BaziToolInput, BaziResult, BaziError } from './types.js';

/**
 * 八字服务包装器 - 使用lunar-javascript
 * 替换之前有问题的@aharris02/bazi-calculator-by-alvamind包
 */
export class MCPBaziService {
    /**
     * 主要的八字计算方法
     */
    async calculateBazi(input: BaziToolInput): Promise<BaziResult> {
        try {
            // 1. 参数验证
            this.validateInput(input);

            // 2. 使用lunar-javascript计算八字
            const solar = Solar.fromYmdHms(
                input.year,
                input.month,
                input.day,
                input.hour,
                0, // 分钟，默认为0
                0  // 秒，默认为0
            );

            // 3. 获取农历和八字信息
            const lunar = solar.getLunar();
            const baZi = lunar.getEightChar();

            // 4. 转换为标准格式
            return this.formatResult(solar, lunar, baZi);

        } catch (error) {
            throw this.handleError(error);
        }
    }

    private validateInput(input: BaziToolInput): void {
        if (!input.year || input.year < 1900 || input.year > 2100) {
            throw new Error('年份必须在1900-2100之间');
        }

        if (!input.month || input.month < 1 || input.month > 12) {
            throw new Error('月份必须在1-12之间');
        }

        if (!input.day || input.day < 1 || input.day > 31) {
            throw new Error('日期必须在1-31之间');
        }

        if (input.hour === undefined || input.hour < 0 || input.hour > 23) {
            throw new Error('小时必须在0-23之间');
        }
    }

    private formatResult(solar: any, lunar: any, baZi: any): BaziResult {
        // 获取天干地支
        const yearGanZhi = baZi.getYear();
        const monthGanZhi = baZi.getMonth();
        const dayGanZhi = baZi.getDay();
        const hourGanZhi = baZi.getTime();

        // 基础结果
        const result: BaziResult = {
            pillars: {
                year: yearGanZhi,
                month: monthGanZhi,
                day: dayGanZhi,
                hour: hourGanZhi
            },
            elements: {
                wood: 0,
                fire: 0,
                earth: 0,
                metal: 0,
                water: 0
            },
            // 添加更多信息
            animal: lunar.getYearShengXiao(),
            constellation: solar.getXingZuo(),
            lunarDate: {
                year: lunar.getYear(),
                month: lunar.getMonth(),
                day: lunar.getDay(),
                isLeapMonth: false // lunar-javascript没有直接的isLeap方法，暂时设为false
            }
        };

        // 计算五行分布
        this.calculateElements(result, [yearGanZhi, monthGanZhi, dayGanZhi, hourGanZhi]);

        return result;
    }

    private calculateElements(result: BaziResult, ganZhiList: string[]): void {
        // 天干地支对应的五行
        const ganWuXing: { [key: string]: string } = {
            '甲': '木', '乙': '木',
            '丙': '火', '丁': '火',
            '戊': '土', '己': '土',
            '庚': '金', '辛': '金',
            '壬': '水', '癸': '水'
        };

        const zhiWuXing: { [key: string]: string } = {
            '子': '水', '亥': '水',
            '寅': '木', '卯': '木',
            '巳': '火', '午': '火',
            '申': '金', '酉': '金',
            '辰': '土', '戌': '土', '丑': '土', '未': '土'
        };

        // 统计五行
        ganZhiList.forEach(ganZhi => {
            if (ganZhi && ganZhi.length >= 2) {
                const gan = ganZhi[0];
                const zhi = ganZhi[1];

                // 天干五行
                if (gan && ganWuXing[gan]) {
                    this.addElement(result, ganWuXing[gan], 30); // 天干权重较高
                }

                // 地支五行
                if (zhi && zhiWuXing[zhi]) {
                    this.addElement(result, zhiWuXing[zhi], 20); // 地支权重
                }
            }
        });
    }

    private addElement(result: BaziResult, element: string, weight: number): void {
        switch (element) {
            case '木':
                result.elements.wood += weight;
                break;
            case '火':
                result.elements.fire += weight;
                break;
            case '土':
                result.elements.earth += weight;
                break;
            case '金':
                result.elements.metal += weight;
                break;
            case '水':
                result.elements.water += weight;
                break;
        }
    }

    private handleError(error: any): BaziError {
        return {
            code: 'CALCULATION_ERROR',
            message: error.message || '八字计算失败',
            details: error
        };
    }
} 