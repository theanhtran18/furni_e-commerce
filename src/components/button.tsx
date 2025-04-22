import { useEffect } from "react";
import { toast } from "sonner";

const Button = () => {
  useEffect(() => {
    toast.error("Vui lòng nhập username");
  }, []);

  return (
    <>
      <p>đây là button</p>
    </>
  );
};

export default Button;
