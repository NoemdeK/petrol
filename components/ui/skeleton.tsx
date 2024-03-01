import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}
const SkeletonContainer: React.FC<SkeletonProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <SkeletonTheme baseColor="#e7e5e5" highlightColor="#f2f1f1">
      <Skeleton width={width} height={height} />
    </SkeletonTheme>
  );
};

export default SkeletonContainer;
