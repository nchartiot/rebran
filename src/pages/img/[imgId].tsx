import { useRouter } from "next/router";
import { trpc } from "utils/trpc";

const Image = () => {
  const router = useRouter();
  const { imgId } = router.query;

  const id = imgId as string;

  const image = trpc.useQuery(["upload.getFile", { id: id }]);

  console.log(image)
  return <img src="data:image/png;base64,${image.data}" />;
};

export default Image;
