import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href={`/`}>
        <Image src={"/images/RR.png"} width={"200"} height={"200"} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
