/**
 * MCP工具输入接口 - 与Python版本保持兼容
 */
export interface BaziToolInput {
    year: number;
    month: number;
    day: number;
    hour: number;
    gender?: 'male' | 'female';
    timezone?: string;
}

/**
 * 四柱信息
 */
export interface Pillars {
    year: string;    // 年柱，如"甲子"
    month: string;   // 月柱，如"丙寅"
    day: string;     // 日柱，如"戊辰"
    hour: string;    // 时柱，如"庚申"
}

/**
 * 五行分析
 */
export interface Elements {
    wood: number;    // 木
    fire: number;    // 火
    earth: number;   // 土
    metal: number;   // 金
    water: number;   // 水
}

/**
 * 农历日期信息
 */
export interface LunarDate {
    year: number;       // 农历年
    month: number;      // 农历月
    day: number;        // 农历日
    isLeapMonth: boolean; // 是否闰月
}

/**
 * 八字计算结果接口 - 与Python版本保持兼容
 */
export interface BaziResult {
    // 四柱信息
    pillars: Pillars;

    // 五行分析
    elements: Elements;

    // 生肖
    animal?: string;

    // 星座
    constellation?: string;

    // 农历信息
    lunarDate?: LunarDate;

    // 分析信息（可选）
    analysis?: {
        dayMaster: string;     // 日主
        strength: string;      // 强弱
    };

    // 十神信息（可选）
    tenGods?: any;

    // 生肖信息（兼容旧版本）
    zodiac?: {
        year: string;
        month: string;
        day: string;
        hour: string;
    };
}

/**
 * 错误类型定义
 */
export interface BaziError {
    code: string;
    message: string;
    details?: any;
}

/**
 * 工具响应类型
 */
export interface ToolResponse {
    content: Array<{
        type: 'text';
        text: string;
    }>;
}

/**
 * MCP服务器配置
 */
export interface ServerConfig {
    name: string;
    version: string;
    description?: string;
} 