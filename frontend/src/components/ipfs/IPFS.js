import { NFTStorage } from "nft.storage"

//NFTStorage에 저장된 개인api 키
const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU4MmE0MTUwMDcxQ0NhNjQ3RUVkMzY3N2Y0ZTYwQjcyNDk5N2FDMWEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MzIwNjA1MjQ1MCwibmFtZSI6Inpla2VORlQifQ.Szpr-yCQ80tJaqRIF78ZNt0x3tPFh6XKtMnYmVMQAx8",
}) //#API Key# 부분에 발급받은 키를 넣어줘라

//imgUrl->File
const convertURLtoFile = async (url) => {
  const response = await fetch(url)
  const data = await response.blob()
  const ext = url.split(".").pop() // url 구조에 맞게 수정할 것
  const filename = url.split("/").pop() // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` }

  return new File([data], filename, metadata)
}

//url생성 -> 이름 설명 이미지로 메타데이터를 만든다.
export async function createToken(name, description, imgUrl) {
  const imgFile = await convertURLtoFile(imgUrl)
  //console.log(imgFile)
  const metadata = {
    name: name,
    description: description,
    image: imgFile,
  }

  const result = await client.store(metadata)
  //console.log(result.url.slice(7));
  //console.log(JSON.stringify(result));

  return "https://ipfs.io/ipfs/" + result.url.slice(7)
}
