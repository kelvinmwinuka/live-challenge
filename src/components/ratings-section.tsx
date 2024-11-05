import { useState } from "react";
import {
  TriangleDownIcon,
  TriangleRightIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import RatingsTree from "~/components/ratings-tree";
import type { Product } from "../server/api/routers/product/types";
import CustomProgress from "~/components/custom-progress";

function RatingsSection({ product }: Readonly<{ product: Product }>) {
  const [showRequirements, setShowRequirements] = useState(false);

  const totalRequirements = product.requirements.length;
  const metRequirements = product.requirements.filter(
    (requirement) => requirement.status === "met",
  ).length;
  const partiallyMetRequirements = product.requirements.filter(
    (requirement) => requirement.status === "partially-met",
  ).length;

  return (
    <div className="">
      <div className="flex gap-[8px]">
        {/* Ratings section */}
        <div className="flex w-[25%] items-center gap-[4px]">
          <Button
            className="p-[0px]"
            variant={"ghost"}
            onClick={() => {
              setShowRequirements((prev) => !prev);
            }}
          >
            {showRequirements ? <TriangleDownIcon /> : <TriangleRightIcon />}
          </Button>
          <div>
            {product.productScoring.fitScore < 50 && (
              <div className="flex items-center gap-[10px]">
                <Badge
                  variant="default"
                  className="bg-red-200 text-red-800"
                >{`${product.productScoring.fitScore}%`}</Badge>
                <p className="font-bold text-red-800">Poor fit</p>
              </div>
            )}
            {product.productScoring.fitScore >= 50 &&
              product.productScoring.fitScore < 75 && (
                <div className="flex items-center gap-[10px]">
                  <Badge
                    variant="default"
                    className="bg-yellow-200 text-yellow-800"
                  >{`${product.productScoring.fitScore}%`}</Badge>
                  <p className="font-bold text-yellow-800">Okay fit</p>
                </div>
              )}
            {product.productScoring.fitScore >= 75 && (
              <div className="flex items-center gap-[10px]">
                <Badge
                  variant="default"
                  className="bg-green-200 text-green-800"
                >{`${product.productScoring.fitScore}%`}</Badge>
                <p className="font-bold text-green-800">Good fit</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex h-full w-full gap-[8px]">
          {/* Ratings tree section */}
          <div className="flex items-center">
            <RatingsTree />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between gap-[8px]">
              <span className="text-sm uppercase">Requirements met</span>
              <div className="w-[70%]">
                <CustomProgress
                  progress={(metRequirements / totalRequirements) * 100}
                  buffer={
                    ((metRequirements + partiallyMetRequirements) /
                      totalRequirements) *
                    100
                  }
                />
              </div>
              <span className="">{`${metRequirements}/${totalRequirements}`}</span>
            </div>
            <div className="flex items-center justify-between gap-[8px]">
              <span className="text-sm uppercase">Stackfix rating</span>
              <div className="w-[70%]">
                <CustomProgress
                  progress={(product.productScoring.stackfixScore / 10) * 100}
                  buffer={0}
                />
              </div>
              <div className="flex items-center gap-[4px]">
                <StarFilledIcon />
                <span>
                  {(product.productScoring.stackfixScore / 10).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showRequirements && (
        <div>
          {product.requirements.map((requirement) => (
            <div key={requirement.name}>
              <span>{requirement.name}</span>
              {requirement.status === "met" && (
                <Badge variant="default" className="bg-green">
                  {requirement.status}
                </Badge>
              )}
              {requirement.status === "unmet" && (
                <Badge variant="default" className="bg-red">
                  {requirement.status}
                </Badge>
              )}
              {requirement.status === "partially-met" && (
                <Badge variant="default" className="bg-yellow">
                  {requirement.status}
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RatingsSection;
