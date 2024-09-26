/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
          port: '',
          pathname: '/t/p/**', // Permitir todos los paths que comiencen con /t/p/
        },
      ],
    },
  };
  
  export default nextConfig;
  