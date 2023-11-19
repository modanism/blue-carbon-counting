import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NotFound = () => {
    return (<main className="flex min-h-screen flex-col items-center bg-[#FAFAFA] pt-[200px]">
    <FontAwesomeIcon
      icon={["fas", "triangle-exclamation"]}
      size="2xl"
      color="#486284"
    />

    <h1 className="text-center text-[48px] text-[#486284]">
      Oops! the page you're looking for is nowhere to found
    </h1>
  </main>)
}

export default NotFound