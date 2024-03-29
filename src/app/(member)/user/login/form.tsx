'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import {
  Button,
  Checkbox as BaseCheckbox,
  FormControlLabel,
  FormGroup,
  styled,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/common/Input';
import { useWidth } from '@/hooks';
import { userLogin } from '@/assets/api';
import useStore from '@/store';

export const loginDataSchema = z.object({
  email: z.string().email('請輸入有效的電子郵件地址'),
  password: z.string().min(1),
});

type LoginDataSchema = z.infer<typeof loginDataSchema>;

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingTop: '2.5rem',
  paddingBottom: '2.5rem',
}));

const Checkbox = styled(BaseCheckbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.MuiCheckbox-colorPrimary': {
    color: theme.palette.primary.main,
  },
}));

const Label = styled(Typography)(({ theme }) => ({
  color: 'white',
  [theme.breakpoints.down('md')]: { fontSize: '0.875rem' },
  [theme.breakpoints.up('md')]: { fontSize: '1rem' },
}));

const LoginForm = () => {
  const router = useRouter();
  const setIsLogin = useStore((state) => state.setIsLogin);
  const [isLoading, setIsLoading] = useState(false);
  const account = Cookies.get('account');
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginDataSchema>({
    defaultValues: {
      email: account || undefined,
    },
    resolver: zodResolver(loginDataSchema),
  });
  const widthSize = useWidth();
  const isSmallDevice = widthSize === 'sm';

  const email = watch('email');
  const wait = async (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));
  const onSubmit = async (data: LoginDataSchema) => {
    const { email, password } = data;
    setIsLoading(true);

    const res = await userLogin({
      email,
      password,
    });

    setIsLoading(false);
    if (res.status === true) {
      setIsLogin(true);
      alert('登入成功');
      router.push('/');
    } else {
      setError('password', {
        type: 'manual',
        message: res.message,
      });
    }
  };

  const handleRememberAccount = (email: string, trigger: boolean) => {
    if (trigger) {
      Cookies.set('account', email);
    } else {
      Cookies.remove('account');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="電子信箱"
          labelColor={'white'}
          fullWidth
          type="email"
          {...register('email')}
          placeholder="請輸入您的Email"
          error={errors.email ? true : false}
          helperText={errors.email ? errors.email.message : ''}
        />
        <Input
          label="密碼"
          labelColor={'white'}
          fullWidth
          type="password"
          {...register('password')}
          placeholder="請輸入您的密碼"
          error={errors.password ? true : false}
          helperText={errors.password ? errors.password.message : ''}
        />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={account ? true : false}
                  onChange={(e) => handleRememberAccount(email, e.target.checked)}
                />
              }
              label={<Label color="white">記住帳號</Label>}
            />
          </FormGroup>
          <Link href="/user/getcode">忘記密碼</Link>
        </Stack>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!isDirty || !isValid || isLoading}
          sx={{ padding: '1rem', marginTop: '2.5rem' }}>
          會員登入
        </Button>
      </Form>
      <Typography variant={isSmallDevice ? 'body2' : 'body1'} component="span" sx={{ fontWeight: 400 }} color="white">
        {`沒有會員嗎？`}
        <Link href={'/user/signup'} sx={{ marginLeft: '0.5rem' }}>
          前往註冊
        </Link>
      </Typography>
    </>
  );
};

export default LoginForm;
