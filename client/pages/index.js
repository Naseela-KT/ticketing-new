import buildClient from '../api/build-client';

export default({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

const getServerSideProps = async (context) => {
  console.log('LANDING PAGE!');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return {
    props: {
      currentUser: data,
    },
  };
};


export { getServerSideProps };
