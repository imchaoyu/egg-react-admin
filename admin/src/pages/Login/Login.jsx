import { useState } from 'react';
import { Button, message } from 'antd';
import { getPublicKey, demo, login } from '@/services/login';
import { Encrypt, setSession } from '@/utils';

const Login = () => {
  const [publicKey, setPublicKey] = useState('');
  const [encode, setEncode] = useState('');
  // 登录
  const onLogin = async () => {
    const params = {
      username: 'test',
      password: '123456',
    };
    const res = await login(params);
    await setSession('openid', res.data.token, false);
    console.log('res: ', res.data);
  };
  const getPK = async () => {
    try {
      const res = await getPublicKey();
      console.log('res: ', res);
      setPublicKey(res.data);
      setSession('public_key', res.data);
      message.info('获取成功');
    } catch (err) {
      console.log(err);
    }
  };
  const onDecode = async () => {
    try {
      const encrypted = await Encrypt({ name: 'chaoyu', age: 100 });
      console.log('encrypted: ', encrypted);
      if (!encrypted) {
        message.error('数据加密出错');
        return false;
      }
      setEncode("{ name: 'chaoyu', age: 100 }");
      const res = await demo({ data: { name: 'chaoyu', age: 100 } });
      console.log('res: ', res);
    } catch (err) {
      console.log(err);
    }
    // const req = await fetckDecode()
  };
  return (
    <div>
      <h1>Login</h1>
      <Button type="primary" onClick={onLogin}>
        登录
      </Button>
      <Button onClick={getPK}>获取key</Button>
      <Button onClick={onDecode}>加密</Button>
      <div>公钥：{publicKey}</div>
      <div>加密内容：{encode}</div>
    </div>
  );
};

export default Login;
