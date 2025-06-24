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
 * 四柱信息 - 使用中文字段名
 */
export interface Pillars {
    年柱: string;    // 年柱，如"甲子"
    月柱: string;   // 月柱，如"丙寅"
    日柱: string;     // 日柱，如"戊辰"
    时柱: string;    // 时柱，如"庚申"
}

/**
 * 五行分析 - 简单统计
 */
export interface Elements {
    木: number;    // 木的个数
    火: number;    // 火的个数
    土: number;   // 土的个数
    金: number;   // 金的个数
    水: number;   // 水的个数
}

/**
 * 农历日期信息
 */
export interface LunarDate {
    农历年: number;       // 农历年
    农历月: number;      // 农历月
    农历日: number;        // 农历日
    是否闰月: boolean; // 是否闰月
    农历月名?: string;   // 如"腊月"、"正月"等
}

/**
 * 八字计算结果接口 - 使用中文字段名
 */
export interface BaziResult {
    // 四柱信息
    四柱: Pillars;

    // 五行分析
    五行: Elements;

    // 生肖
    生肖?: string;

    // 星座
    星座?: string;

    // 农历信息
    农历?: LunarDate;

    // 日主分析
    日主?: string;     // 日主天干
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