/* eslint-disable react/react-in-jsx-scope */
export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/home",
    },
    props: {},
  };
}

export default function Index() {
  return <div></div>;
}
