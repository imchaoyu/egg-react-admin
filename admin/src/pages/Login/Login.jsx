import { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { getPublicKey, demo, login } from '@/services/login';
import { Decrypt, setSession, getSession } from '@/utils';

const Login = () => {
  const [publicKey, setPublicKey] = useState('');
  const [encode, setEncode] = useState('');

  useEffect(() => {
    getSe();
  }, [publicKey]);
  const getSe = async () => {
    const public_key = await getSession('public_key');
    if (public_key) {
      setPublicKey(public_key);
    }
  };
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
      const data = { data: { name: 'chaoyu', age: 100 } };
      const res = await demo(data);
      const Dres = await Decrypt(res.data);
      setEncode(JSON.stringify(Dres));
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
