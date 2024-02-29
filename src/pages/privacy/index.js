import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import parse from "html-react-parser";
import React from "react";
import sanitizeHtml from "sanitize-html";
export async function getServerSideProps() {
  try {
    const requestOption = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/page?slug=tos`,
      requestOption
    );
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
      },
    };
  }
}

const Privacy = ({ data }) => {
  const htmlFrom = (htmlString) => {
    const cleanHtmlString = sanitizeHtml(htmlString);
    const html = parse(cleanHtmlString);
    return html;
  };

  return (
    <GlobalLayout>
      <div class="px-12 py-12 text-2xl">
        {htmlFrom(data?.data?.section_data?.[0]?.value)}
      </div>
    </GlobalLayout>
  );
};

export default Privacy;
