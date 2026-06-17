import { useModel } from '@umijs/max';
import { App, Avatar, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import { fileControllerUpload } from '@/services/silent-rain-admin/file';

interface AvatarUploadProps {
  value?: API.FileBaseDto;
  onChange?: (value: API.FileBaseDto) => void;
  /** 限制上传文件大小，单位MB，默认10M */
  maxSize?: number;
  readonly?: boolean;
}
const AvatarUpload: React.FC<AvatarUploadProps> = ({
  value,
  onChange,
  maxSize,
  readonly,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const { message } = App.useApp();

  const onModalOk = async (
    value: ReturnType<Exclude<UploadProps['beforeUpload'], undefined>>,
  ) => {
    if (value instanceof File) {
      const { success, data } = await fileControllerUpload(
        { module: 'avatar' },
        value,
      );
      if (success) {
        message.success('上传成功！');
        if (data)
          onChange?.({
            fileId: data?.fileId,
            filePath: data?.filePath,
            fileOriginalName: data?.fileOriginalName,
          });
      }
    }
  };
  useEffect(() => {
    if (value?.filePath) {
      setImageUrl(API_URL + value.filePath);
    }
  }, [value]);
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    window.open(src);
  };
  const beforeUpload = (file: RcFile) => {
    const limitSize = maxSize || 10;
    const limit = file.size / 1024 / 1024 < limitSize;
    if (!limit) {
      message.error(
        `图片不能大于${limitSize >= 1 ? `${limitSize}MB` : `${limitSize * 1000}KB`}`,
      );
    }
    return limit;
  };
  const uploadProps: UploadProps = {
    accept: 'image/*',
    name: 'avatar',
    beforeUpload,
    listType: 'picture-card',
    showUploadList: false,
    onPreview,
    maxCount: 1,
  };
  return (
    <>
      {readonly ? (
        imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '64px',
            }}
          />
        ) : (
          <Avatar size={64} style={{ backgroundColor: '#87d068' }}>
            {currentUser?.nickname.charAt(0)}
          </Avatar>
        )
      ) : (
        <ImgCrop rotationSlider onModalOk={onModalOk}>
          <Upload {...uploadProps}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              <div
                style={{
                  fontSize: '30px',
                }}
              >
                +
              </div>
            )}
          </Upload>
        </ImgCrop>
      )}
    </>
  );
};
export default AvatarUpload;
