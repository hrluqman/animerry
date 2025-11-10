import { CopyrightIcon } from "lucide-react";

const AnimerryFooter = () => {
  return (
    <footer className="flex flex-col justify-center items-center py-8">
      <div className="flex justify-center items-center">
        <p className="text-light text-[9px]">
          <CopyrightIcon className="inline-block -translate-y-[1px]" size={8} />{" "}
          Animerry. All rights reserved.
        </p>
      </div>
      <div>
        <p className="text-light text-[9px]">
          Disclaimer: This site does not store any files on its server. All
          contents are provided by non-affiliated third parties.
        </p>
      </div>
    </footer>
  );
};

export default AnimerryFooter;
