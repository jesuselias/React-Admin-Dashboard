import { useCallback } from 'react';
import { useAuth } from '@workos-inc/authkit-react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { Iconify } from 'src/components/iconify';

export function SignInView() {
  const { isLoading,  signIn } = useAuth();

  const handleSignIn = useCallback(async () => {
    try {
      // Redirige al usuario a la página de inicio de sesión 
      await signIn();
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
    }
  }, [signIn]); // Agrega location.pathname como dependencia

//   const handleSignIn = () => {
//   const baseUrl =
//     process.env.NODE_ENV === "production"
//       ? "https://material-kit-react-psi.vercel.app"
//       : "http://localhost:3001";

//   window.location.href = `${baseUrl}/api/auth/signin`;
// };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
        loading={isLoading} // Muestra un indicador de carga si está cargando
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>
      {renderForm}
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>
      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box>
    </>
  );
}
