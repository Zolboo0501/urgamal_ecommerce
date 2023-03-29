import { Collapse, Text, Grid } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const Category = ({ positionSticky, parent, main, child }) => {
  return (
    <div
      className={positionSticky === true ? "rounded-md bg-white fixed w-80 top-36" : "rounded-md bg-white"}
    // fixed top-40 w-80
    >
      <Grid.Container
        style={{ borderRadius: "5px !important", boxShadow: "none" }}
      >
        <div
          className="flex flex-row justify-between px-4 py-4 w-full mx-4"
          style={{ borderBottom: "1px solid rgba(132, 132, 132, 0.18)" }}
        >
          <p className="font-semibold text-lg">Ангилал</p>
          <Image
            src={"/icons/plant.svg"}
            width={25}
            height={25}
            color={"#8DC57F"}
          />
        </div>
        <Grid style={{ width: "100%" }} grow gutter="xs">
          <Collapse.Group divider={false} css={{ marginTop: "0px" }}  >
            {main !== undefined && main.map((e) => {
              return (
                <Collapse title={e.name} style={{ width: "100%", }} cs={{ paddingTop: "0px" }}>
                  {parent !== undefined && parent.map((el) => {
                    if (e.id === el.main_cat_id) {
                      return (
                        <Collapse.Group divider={false}>
                          <Collapse title={el.name}>
                            <div className="max-h-64 overflow-auto scrollbar-hide">
                              {child !== undefined && child.map((item) => {
                                if (e.id === item.main_cat_id && el.id === item.parent_id) {
                                  return (
                                    <Link>
                                      <Text style={{ width: "100%" }}>{item.name}</Text>
                                    </Link>
                                  )
                                }
                              })}
                            </div>
                          </Collapse>
                        </Collapse.Group>
                      )
                    }
                  })}
                </Collapse>
              )
            })}
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Category;
