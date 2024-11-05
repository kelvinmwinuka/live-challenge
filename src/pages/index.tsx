import { useState, useEffect } from "react";
import Head from "next/head";
import { api } from "~/utils/api";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { InfoCircledIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import RatingsSection from "~/components/ratings-section";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, pageSize]);

  const { data: products, isLoading } = api.product.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Stackfix</title>
        <meta name="description" content="stackfix.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5">
        <div className="flex w-full flex-col gap-[24px]">
          {isLoading &&
            Array.from({ length: 10 })
              .fill(0)
              .map((_, index) => (
                <div className="flex items-center space-x-4" key={index}>
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
          {!isLoading &&
            products?.map((product) => (
              <Card key={product.id} className="bg-[#FAF7F7]">
                <CardContent>
                  <div className="flex w-full items-center gap-[10px] p-[20px]">
                    <div className="w-[10%]">
                      {/* Icon Section */}
                      <Image
                        src={product.logoUrl ?? ""}
                        alt={product.name}
                        width={88}
                        height={88}
                      />
                    </div>
                    <div className="flex w-[70%] flex-col gap-[20px]">
                      <div className="flex items-center gap-[24px]">
                        {/* Product name & dealbreaker secion */}
                        <Link href={`/product/${product.slug}`}>
                          <h3>{product.name}</h3>
                        </Link>
                        <Link href={`/product/${product.slug}`}>
                          <ExternalLinkIcon />
                        </Link>
                        <div className="flex gap-[16px]">
                          {product.dealBreakers.map((dealBreaker) => (
                            <Badge
                              key={dealBreaker}
                              variant="default"
                              className="bg-red-200 text-red-800"
                            >
                              {dealBreaker}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <RatingsSection product={product} />
                    </div>
                    <div className="flex w-[20%] justify-between">
                      <Separator orientation="vertical" />
                      <div className="flex flex-col items-end gap-[16px]">
                        {/* Product price section */}
                        <h3 className="font-bold">{`$${product.pricing.totalPrice}`}</h3>
                        <div className="flex items-center gap-[8px]">
                          {/* Pricing period section */}
                          <span className="text-sm">{`Per ${product.pricing.period}`}</span>
                          <InfoCircledIcon />
                        </div>
                        <Link href={`/product/${product.slug}`}>
                          <Button variant={"secondary"}>More details</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
    </>
  );
}
