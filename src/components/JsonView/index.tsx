import { safeJsonParse } from '@/utils';
import ReactJson from '@microlink/react-json-view';

interface Props {
  /** JSON字符串 */
  value: string;
}

const JsonView: React.FC<Props> = ({ value }) => {
  return (
    <ReactJson
      name={false}
      src={safeJsonParse(value) || {}}
      theme="rjv-default"
      displayDataTypes={false}
      iconStyle="triangle"
      displayObjectSize={false}
      indentWidth={4}
      collapsed={1}
      collapseStringsAfterLength={false}
      onEdit={false}
      onAdd={false}
      onDelete={false}
      enableClipboard={true}
      style={{ fontFamily: 'unset' }}
    />
  );
};

export default JsonView;
