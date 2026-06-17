import useDict from '@/hooks/useDict';

const DictSseTest: React.FC = () => {
  const [genderDict] = useDict('gender');
  return (
    <pre style={{ fontSize: 12, lineHeight: 1.6 }}>
      {JSON.stringify(genderDict?.toOptions(), null, 2)}
    </pre>
  );
};

export default DictSseTest;
