'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import { AppDispatch, RootState } from "@/store/store";
import ErrorMessage from '@/app/components/shared/ErrorMessage';
import { useRouter } from "next/navigation";
import { useLogin } from '@/hooks/useAuth';
import { login } from '@/store/apps/auth/auth-action';


const AuthLogin = ({ title, subtitle, subtext }: { title?: string; subtitle?: JSX.Element; subtext?: JSX.Element }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data, isSuccess, } = useLogin();

  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.authReducer);

  const [formData, setFormData] = useState({
    email: 'aakash@gmail.com',
    password: 'password',
  });

  const [formError, setFormError] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || formData.email === "") {
      setFormError((prev) => ({ ...prev, email: "Invalid Email" }));

    }
    if (!formData.password || formData.password === "") {
      setFormError((prev) => ({ ...prev, password: "Invalid Password" }));;
      return

    }
    dispatch(login(formData.email, formData.password));

  };


  useEffect(() => {

    if (isAuthenticated) {
      loginSuccessRedirect();
    }

  }, [isAuthenticated]);
  const loginSuccessRedirect = () => {
    router.push('/');
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}
      {subtext}

      <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box>

      <form onSubmit={handleLogin}>
        <Stack spacing={2} mt={2}>
          <Box>
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
              id="email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!formError?.email}
              helperText={formError?.email}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              id="password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              error={!!formError?.password}
              helperText={formError?.password}

            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/auth/auth1/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>
        <Box mt={2}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
      </form>

      {
        error &&
        <ErrorMessage error={error} />
      }
      {subtitle}
    </>
  );
};

export default AuthLogin;
