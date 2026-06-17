/** 将列表请求转化为适合ProTable展示的数据 */
export const formatListRes =
  <T>(
    fn: (params: T) => Promise<
      API.ResponseDto & {
        data?: {
          list?: any[];
          current?: number;
          pageSize?: number;
          total?: number;
        };
      }
    >,
  ) =>
  async (params: T) => {
    const { success, data } = await fn(params);
    if (success) {
      return {
        data: data?.list || [],
        total: data?.total || 0,
        success: true,
      };
    }
    return {
      data: [],
      total: 0,
      success: false,
    };
  };
