import { useState } from 'react';
import { Button, message } from 'antd';
import JSEncrypt from 'jsencrypt';
import { getPublicKey, demo } from '@/services/login';

const Login = () => {
  const [publicKey, setPublicKey] = useState('');
  const [encode, setEncode] = useState('');
  const getPK = async () => {
    try {
      const res = await getPublicKey();
      console.log('res: ', res);
      setPublicKey(res.data);
      message.info('获取成功');
    } catch (err) {
      console.log(err);
    }
  };
  const onDecode = async () => {
    if (!publicKey) {
      message.error('请先获取key');
      return false;
    }
    try {
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      const encrypted = encrypt.encrypt(JSON.stringify({ name: 'chaoyu', age: 100 }));
      const res = await demo({ data: encrypted });
      console.log('res: ', res);
      setEncode(encrypted);
    } catch (err) {
      console.log(err);
    }
    // const req = await fetckDecode()
  };
  return (
    <div>
      <h1>Login</h1>
      <Button onClick={getPK}>获取key</Button>
      <Button onClick={onDecode}>加密</Button>
      <div>公钥：{publicKey}</div>
      <div>加密内容：{encode}</div>
    </div>
  );
};

export default Login;
