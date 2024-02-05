import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const client = buildClient(context.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (context.Component.getServerSideProps) {
    pageProps = await context.Component.getServerSideProps(context.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
