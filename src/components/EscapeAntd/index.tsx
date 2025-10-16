import { App } from 'antd';

import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';

let message: MessageInstance, notification: NotificationInstance, modal: ModalStaticFunctions;

/** 从 Ant Design（antd）库中提取全局的消息（message）、通知（notification）和模态框（modal）实例，并将它们暴露给整个项目使用。这样做的目的是让你可以在 React 组件之外（比如在工具函数或 Redux action 中）也能方便地调用这些 UI 反馈方法。
 *
 * https://github.com/Wxh16144/antd-41855-demo/tree/master
 */
function EscapeAntd() {
  const { message: me, notification: n, modal: mo } = App.useApp();

  message = me;
  notification = n;
  // @ts-ignore
  modal = mo;

  return null;
}

export { message, notification, modal };

export default EscapeAntd;
