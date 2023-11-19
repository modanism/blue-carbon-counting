import Image from "next/image";
import MangroveImg from "../../../assets/img/mangrove.png";

const DetailArticle = ({ params }: { params: { articleId: string } }) => {
  return (
    <main className="flex min-h-screen flex-col items-start px-[112px] bg-[#FAFAFA] pt-[150px] gap-[21px]">
      <h1 className="text-neutral-10 text-[40px] font-[700] text-center">
        Lorem Ipsum is simply {params.articleId}
      </h1>
      <div className="overflow-hidden h-[358px] w-full rounded-[24px] relative">
        <Image
          src={MangroveImg}
          alt="news image"
          placeholder="blur"
          style={{objectFit:'fill'}}
          fill
        />
      </div>
      <h2 className="text-[16px] text-neutral-7">
        Mochammad Ramadhany<br></br>Bandung, 19 November 2023
      </h2>
      <p className="text-[16px] text-[#1A202C] mb-[75px]">
        {/* <div dangerouslySetInnerHTML={}></div> */}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quam lacus
        suspendisse faucibus interdum. Nulla facilisi etiam dignissim diam quis
        enim. Elementum nisi quis eleifend quam. At volutpat diam ut venenatis
        tellus in metus. Posuere ac ut consequat semper. Enim ut sem viverra
        aliquet eget sit amet tellus cras. Dui sapien eget mi proin sed libero
        enim sed faucibus. Et ultrices neque ornare aenean euismod elementum.
        Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
        tristique. In nibh mauris cursus mattis molestie. Nullam vehicula ipsum
        a arcu. Tellus orci ac auctor augue mauris augue neque. Proin sagittis
        nisl rhoncus mattis rhoncus. Cum sociis natoque penatibus et magnis dis
        parturient montes nascetur. Leo integer malesuada nunc vel risus commodo
        viverra maecenas accumsan. Sit amet dictum sit amet justo donec. Nulla
        facilisi morbi tempus iaculis urna. Viverra nam libero justo laoreet
        sit.<br></br> <br></br>
        Convallis aenean et tortor at. In vitae turpis massa sed elementum
        tempus. Orci sagittis eu volutpat odio. Ipsum faucibus vitae aliquet
        nec. Vitae nunc sed velit dignissim sodales ut. Enim ut tellus elementum
        sagittis vitae. Nunc eget lorem dolor sed. Consectetur adipiscing elit
        ut aliquam purus sit. Sit amet porttitor eget dolor morbi. Tincidunt
        arcu non sodales neque sodales. <br></br>
        <br></br>
        Posuere sollicitudin aliquam ultrices sagittis orci a. Imperdiet proin
        fermentum leo vel orci porta non pulvinar. Fermentum dui faucibus in
        ornare quam viverra orci sagittis. Mauris in aliquam sem fringilla.
        Turpis cursus in hac habitasse. Eget est lorem ipsum dolor sit amet.
        Lobortis mattis aliquam faucibus purus. Amet volutpat consequat mauris
        nunc congue nisi vitae suscipit. Tellus molestie nunc non blandit massa
        enim nec. Cursus euismod quis viverra nibh cras pulvinar mattis nunc
        sed. Tortor condimentum lacinia quis vel eros donec ac odio. Accumsan
        lacus vel facilisis volutpat est.<br></br>
        <br></br>
        Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit.
        Turpis tincidunt id aliquet risus feugiat in ante metus. Integer
        malesuada nunc vel risus commodo. Lacus luctus accumsan tortor posuere
        ac ut consequat semper. Nisl suscipit adipiscing bibendum est ultricies.
        Pulvinar neque laoreet suspendisse interdum consectetur libero. In massa
        tempor nec feugiat nisl pretium fusce id velit. Urna et pharetra
        pharetra massa. Amet cursus sit amet dictum sit. Sed blandit libero
        volutpat sed cras ornare arcu dui. Vitae congue mauris rhoncus aenean
        vel elit scelerisque mauris. Velit scelerisque in dictum non consectetur
        a erat nam.<br></br>
        <br></br>
        Original Source:
        https://fairatmos.com/blog/small-business-big-impact-dekayu-bringing-indonesian-wood-craft-brand-to-the-world-stage
      </p>
    </main>
  );
};

export default DetailArticle;
