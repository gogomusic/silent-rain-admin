import { useState } from 'react';

const useAutoCompleteEmail = () => {
  const [emailOptions, setEmailOptions] = useState<{ value: string }[]>([]);
  /** 邮箱自动填充配置 */
  const setAutoCompleteEmail = (searchText: string) => {
    const suffix = [
      '@qq.com',
      '@163.com',
      '@foxmail.com',
      '@gmail.com',
      '@outlook.com',
      '@yahoo.com',
    ];
    return suffix.map((item) => {
      return { value: `${searchText}${item}` };
    });
  };

  const onSearch = (searchText: string) => {
    setEmailOptions(!searchText ? [] : setAutoCompleteEmail(searchText));
  };
  const autoCompleteCfg = { options: emailOptions, onSearch };
  return autoCompleteCfg;
};

export default useAutoCompleteEmail;
