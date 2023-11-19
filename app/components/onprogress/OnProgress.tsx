import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const OnProgress = () => {
    return (<main className="flex min-h-screen flex-col items-center bg-[#FAFAFA] pt-[200px]">
    <FontAwesomeIcon
      icon={["fas", "person-digging"]}
      size="2xl"
      color="#486284"
    />

    <h1 className="text-center text-[48px] text-[#486284]">
      We're still cooking our website
    </h1>
  </main>)
}

export default OnProgress