// import { Collapse, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import useCategories from "@/hooks/useCategories";
import { rem } from "@mantine/core";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";
import { useState } from "react";

const Category = ({ padding }) => {
  const router = useRouter();
  const { parent_id, secondary_id, tertiary_id } = router.query;
  const categories = useCategories();
  const [selectParent, setSelectParent] = useState("");
  const [selectChild, setSelectChild] = useState("");
  const itemClasses = {
    base: "w-full rounded-lg data-[open=true]:bg-[#F9FAFB]",
    title:
      "font-open text-[1.1rem] data-[open=true]:text-[#F9BC60] data-[hover=true]:text-[#FD7E14]",
    trigger:
      "data-[hover=true]:text-[#ffffff] rounded-lg h-14 flex items-center data-[focus-visible=true]:outline-0 focus:outline-none data-[open=true]:font-bold",
    indicator:
      "text-medium data-[open=true]:text-[#F9BC60] data-[open=true]:rotate-90",
    content: "text-small py-0 pl-4",
  };
  const childItemClasses = {
    base: "w-full",
    title: "font-open text-medium data-[open=true]:text-[#F9BC60]",
    trigger:
      "py-1 rounded-lg h-14 flex items-center data-[focus-visible=true]:outline-0 focus:outline-none data-[open=true]:font-bold",
    indicator:
      "text-medium data-[open=true]:text-[#F9BC60] data-[open=true]:rotate-90",
    content: " text-small pl-4",
  };

  return (
    <div className="font-open pl-2 pt-2 rounded-md bg-white max-h-screen xl:block lg:block md:block z-10 w-full lg:min-w-[300px] lg:w-[350px] lg:max-w-[450px] lg:overflow-y-auto">
      <Accordion
        showDivider={false}
        itemClasses={itemClasses}
        onSelectionChange={setSelectParent}
        defaultExpandedKeys={[parent_id]}
      >
        {categories &&
          categories?.categories?.map((el, index) => {
            return (
              <AccordionItem
                key={el?.id}
                aria-label={el?.name}
                indicator={<IconChevronRight key={index} size={rem(20)} />}
                title={<span key={el?.id}>{el?.name}</span>}
                startContent={
                  el?.icon && (
                    <Image
                      alt="category-icon"
                      src={el.icon}
                      width={34}
                      height={34}
                    />
                  )
                }
                onPress={() => {
                  router.push(
                    {
                      pathname: `/category/${el.id}`,
                      query: {
                        parent_id: selectParent.currentKey,
                      },
                    },
                    undefined,
                    { shallow: false }
                  );
                }}
              >
                {el?.secondary_cats &&
                  el?.secondary_cats.map((el, index) => {
                    return (
                      <Accordion
                        key={el?.id}
                        showDivider={true}
                        itemClasses={childItemClasses}
                        defaultExpandedKeys={[secondary_id]}
                        onSelectionChange={setSelectChild}
                      >
                        <AccordionItem
                          key={el?.id}
                          aria-label={el?.name}
                          indicator={
                            <IconChevronRight key={index} size={rem(20)} />
                          }
                          title={<span key={index}>{el?.name}</span>}
                          startContent={
                            el?.icon && (
                              <Image
                                alt="category-icon"
                                src={el?.icon}
                                width={24}
                                height={24}
                              />
                            )
                          }
                          onPress={() => {
                            router.push(
                              {
                                pathname: `/category/${el.id}`,
                                query: {
                                  parent_id: selectParent.currentKey,
                                  secondary_id: secondary_id
                                    ? secondary_id
                                    : selectChild.currentKey,
                                },
                              },
                              undefined,
                              { shallow: false }
                            );
                          }}
                        >
                          <div className="flex flex-col gap-6">
                            {el.tertiary_cats?.map((item, idx) => {
                              return (
                                <div
                                  key={idx}
                                  className={`overflow-auto scrollbar-hide flex flex-row justify-between cursor-pointer hover:text-[#F9BC60]
                                  ${
                                    item?.id === tertiary_id
                                      ? "text-[#F9BC60]"
                                      : ""
                                  }
                                  `}
                                >
                                  <span
                                    onClick={() => {
                                      router.push(
                                        {
                                          pathname: `/category/${item.id}`,
                                          query: {
                                            parent_id: parent_id
                                              ? parent_id
                                              : selectParent.currentKey,
                                            secondary_id: secondary_id
                                              ? secondary_id
                                              : selectChild.currentKey,
                                            tertiary_id: item?.id,
                                          },
                                        },
                                        undefined,
                                        { shallow: false }
                                      );
                                    }}
                                  >
                                    {item?.name}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionItem>
                      </Accordion>
                    );
                  })}
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
};

export default Category;
