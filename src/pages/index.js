export async function getServerSideProps(context) {
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
