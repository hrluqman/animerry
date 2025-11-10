import { Button } from "../ui/button";

interface PaginationButtonProps {
  nextPage: () => void;
  prevPage: () => void;
}

const PaginationButton = ({ nextPage, prevPage }: PaginationButtonProps) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <Button
        className="btn-theme text-primary-foreground hover:bg-primary/90 w-[8rem] cursor-pointer px-8"
        onClick={prevPage}
      >
        Previous
      </Button>
      <Button
        className="btn-theme text-primary-foreground hover:bg-primary/90 w-[8rem] cursor-pointer px-8"
        onClick={nextPage}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationButton;
