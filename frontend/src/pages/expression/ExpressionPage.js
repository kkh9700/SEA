import { useState } from "react"
import styles from "./ExpressionPage.module.css"
import ExpressionStart from "./expressionStart/ExpressionStart"
import ExpressionText from "./expressionLevels/ExpressionText"
import ExpressionSelections from "./expressionLevels/ExpressionsSelections"
import ExpressionResult from "./expressionResult/ExpressionResult"
import api from "../../api/api"
const ExpressionPage = () => {
  const [level, setLevel] = useState(1)
  const [selectedWordList, setSelectedWordList] = useState([])

  const addWord = (word) => {
    setLevel(level + 1)
    setSelectedWordList((prevState) => {
      //console.log(prevState)
      return [...prevState, word]
    })
  }

  const expressionTextPage = {
    2: {
      level: 2,
      title: "1. 장소",
      picture: "../../../resources/img/expression/start.jpg",
      text: `정신을 차려 보니 당신은 우두커니 서 있었습니다. 아니면 어딘가 도착하기 위해 걷고 있었는지도 모르겠어요. 근처에서는 신이 난 사람들이 시끄럽게 떠들고 있습니다. 모든 것들이 너무 환해서 눈이 아프네요. 아니면 환청이 들릴 정도로 고요하고 깊은 밤 속 호젓하게 홀로 있으신가요? 눈을 감고 혹은 주변을 살펴보고 직접 말씀해주세요.`,
    },
    4: {
      level: 4,
      title: "2. 행동",
      picture: "../../../resources/img/expression/start.jpg",
      text: "맞아요. 당신은 분명히 ~에 있었습니다! 항상 한 번쯤 방문하는 것을 꿈꾸어왔던 바로 그 장소에요. 아니면 평소에 늘 오고가던 지루한 장소였을까요? 저희는 잘 모르겠지만, 사실 별로 중요한 건 아닙니다. 잘 아시겠지만 당신이 어떤 행동을 하는지가 당신이 누구인지 결정하니까요.",
    },
    6: {
      level: 6,
      title: "3. 성격",
      picture: "",
      text: "물론 당신은 지금 ~ 있었죠! ~ 있었다니 당신은 정말 대단한 사람인 것 같아요. 아니면 하품이 나올 만큼 지루한 사람일까요? 조금만 더 나아간다면 알 수 있을 것 같은 느낌이 들어요. 당신이 생각하기에 , 주변 사람들이 생각하는 당신은 어떤 사람인가요?",
    },
    8: {
      level: 8,
      title: "4. 그림",
      picture: "",
      text: "세상 어떤 사람이 봐도 ~ 당신은 깨달았습니다. 지금 자신은 그림 속이라는 것을요. 어쩌면 사실 이미 알고 있었을지도 모릅니다. 눈에 보이는 모든 사물들의 모습이 평소와는 어딘가 달라 보였거든요. 지금까지 당신이 어떤 그림 속을 지나왔는지 저희에게 알려주세요",
    },
  }

  const expressionSelectPage = {
    3: {
      question: "당신은 지금 어디에 있나요?",
      selectionKeys: [
        "파인다이닝",
        "눈 내린 산 위",
        "울창한 숲속",
        "스페이스X",
        "샤이어",
        "수면 아래",
        "조용한 도서관",
        "폐허",
        "황무지",
        "신비로운 도깨비 마을",
        "소림사",
        "숲 속 어수선한 집 안",
        "꽃이 있는 거실",
        "얼음문 앞",
        "화산",
        "신비한 사원",
        "정글 속",
        "시끄러운 클럽",
        "조용한 카페",
        "방 안",
        "침대 안",
        "감옥안",
        "달 위",
        "화성",
        "회사",
        "풀밭 위",
        "북극",
        "하늘",
        "우주 속",
        "가상현실",
        "파티",
        "학교",
      ],
      selections: {
        파인다이닝: "in the fine dining",
        "눈 내린 산 위": "on top of a snowy mountain",
        "울창한 숲속": "in the dense forest",
        "스페이스X 안": "on SpaceX",
        샤이어: "in the shire",
        "수면 아래": "under water ",
        "조용한 도서관": "in the quite library",
        폐허: "in ruins",
        황무지: "in the wasteland",
        "신비로운 도깨비 마을": "in the mysterious goblin town",
        소림사: `in shaolin temple`,
        "숲 속 어수선한 집 안": `in the Cluttered house in the woods`,
        "꽃이 있는 거실": `in the living room with flowers`,
        "얼음문 앞": `at the ice gate`,
        화산: `in a volcano`,
        "신비한 사원": `in a mysterious temple`,
        "정글 속": `in the jungle`,
        "시끄러운 클럽": `in a noisy club`,
        "조용한 카페": "in the calm cafe",
        "방 안": "in the room",
        "침대 안": "in the bed",
        감옥안: "in prison",
        "달 위": "on the moon",
        화성: "on the mars",
        회사: "in the office",
        "풀밭 위": "on the grass",
        북극: "on the north poll",
        하늘: "in the sky",
        "우주 속": "in the space",
        가상현실: "in virtual reality",
        파티: "at the party",
        학교: "at the school",
      },
    },
    5: {
      question: "당신은 지금 어떤 행동을 하고 있나요?",
      selectionKeys: [
        "웃고 있다",
        "밥을 먹고 있다",
        "달리고 있다",
        "떠돌아 다니고 있다",
        "산책 하고 있다",
        "잠자고 있다",
        "꿈을 꾸고있다",
        "친구를 때리고 있다",
        "친구를 때려눕히고 있다",
        "똥을 싸고 있다",
        "소변을 보고 있다",
        "요리하고 있다",
        "인사하고 있다",
        "도둑질 하고있다",
        "춤추고 있다",
        "비명을 지르고 있다",
        "죽어가고 있다",
        "노래를 부르고 있다",
        "거울을 보고 있다",
        "전화하고 있다",
        "사랑을 고백하고 있다",
        "빨래하고 있다",
        "스키를 타고 있다",
        "축구를 하고 있다",
        "별을 보고 있다",
        "밤하늘을 보고 있다",
        "하늘을 보고 있다",
        "운전하고 있다",
        "칼을 휘두르고 있다",
        "총을 쏘고 있다",
        "피아노를 치고 있다",
        "누워 있다",
        "물 밖으로 나오고 있다",
        "마법을 사용하고 있다",
        "공부하고 있다",
      ],
      selections: {
        "웃고 있다": "smile",
        "밥을 먹고 있다": "is having a meal",
        "달리고 있다": "is running",
        "떠돌아 다니고 있다": "is wandering",
        "산책 하고 있다": "is having a walk",
        "잠자고 있다": "is sleeping",
        "꿈을 꾸고있다": "is dreaming",
        "친구를 때리고 있다": "is heeting its friend",
        "친구를 때려눕히고 있다": "is knocking its friend down",
        "똥을 싸고 있다": "is pooping",
        "소변을 보고 있다": "is peeing",
        "요리하고 있다": "is cooking",
        "인사하고 있다": "is bowing",
        "도둑질 하고있다": "is in the middle of stealing",
        "춤추고 있다": "is dancing",
        "비명을 지르고 있다": "is screaming",
        "죽어가고 있다": "is dying",
        "노래를 부르고 있다": "is singing a song",
        "거울을 보고 있다": "is looking in th mirror",
        "전화하고 있다": "is making a phone call",
        "사랑을 고백하고 있다": "is confessing its love",
        "빨래하고 있다": "is doing the laundry",
        "스키를 타고 있다": "is skiing",
        "축구를 하고 있다": "is playing soccer",
        "별을 보고 있다": "is looking at the stars",
        "밤하늘을 보고 있다": "is looking at the night sky",
        "하늘을 보고 있다": "is looking at the sky",
        "운전하고 있다": "is driving its car",
        "칼을 휘두르고 있다": "is swinging a sword",
        "총을 쏘고 있다": "is shooting a gun",
        "피아노를 치고 있다": "playing a piano",
        "누워 있다": "is lying",
        "물 밖으로 나오고 있다": "jumping out of water",
        "마법을 사용하고 있다": "is casting a spells",
        "공부하고 있다": "is studying",
      },
    },
    7: {
      question: "당신은 어떤 사람인가요?",
      selectionKeys: [
        "강한 사람",
        "연약한 사람",
        "귀여운 사람",
        "사랑스러운 사람",
        "멋진 사람",
        "이쁜 사람",
        "잘생긴 사람",
        "용감한 사람",
        "겁먹은 사람",
        "불쌍한 사람",
        "똑똑한 사람",
        "똘망똘망한 사람",
        "날카로운 사람",
        "나쁜 사람",
        "착한 사람",
        "묘한 사람",
        "형형색색의 사람",
        "무표정한 사람",
        "재밌는 사람",
        "거친 사람",
        "둥근 사람",
        "아름다운 사람",
        "강력한 사람",
        "어두운 사람",
        "밝은 사람",
        "무서운 사람",
        "미친 사람",
        "낭만적 사람",
        "긍정적인 사람",
        "부정적인 사람",
        "창의적인 사람",
      ],
      selections: {
        "강한 사람": "strong",
        "연약한 사람": "weak",
        "귀여운 사람": "cute",
        "사랑스러운 사람": "adorable",
        "멋진 사람": "cool",
        "이쁜 사람": "pretty",
        "잘생긴 사람": "handsome",
        "용감한 사람": "brave",
        "겁먹은 사람": "scared",
        "불쌍한 사람": "poor",
        "똑똑한 사람": "smart",
        "똘망똘망한 사람": "cleared-eyed",
        "날카로운 사람": "sharp",
        "나쁜 사람": "bad",
        "착한 사람": "kind",
        "묘한 사람": "strange",
        "형형색색의 사람": "colorful",
        "무표정한 사람": "expressionless",
        "재밌는 사람": "funny",
        "거친 사람": "rough",
        "둥근 사람": "round",
        "아름다운 사람": "beautiful",
        "강력한 사람": "powerful",
        "어두운 사람": "dark",
        "밝은 사람": "bright",
        "무서운 사람": "scary",
        "미친 사람": "crazy",
        "낭만적 사람": "romantic",
        "긍정적인 사람": "positive",
        "부정적인 사람": "negative",
        "창의적인 사람": "creative",
      },
    },
    9: {
      question: "당신의 눈에 비친 그림 속 세상의 모습은, 어떤 모습인가요?",
      selectionKeys: [
        "초현실주의적",
        "현실적",
        "극사실주의적",
        "고해상도",
        "19세기 초상화",
        "초상화",
        "디즈니",
        "요시다 아키히토 화풍",
        "신카이 마코도 화풍",
        "유화",
        "아이폰 14 프로로 촬영",
        "레오나르도 다빈치 화풍",
        "3D",
        "상세함",
        "연필 그림",
        "애니메이션",
        "일본 애니 배경",
        "미래지향적",
        "알록달록",
        "디지털 일러스트",
        "일러스트",
        "지브리",
        "무광 페인팅",
        "시원한 색",
        "따뜻한 색",
      ],
      selections: {
        초현실주의적: "surrealist style",
        현실적: "realistic",
        극사실주의적: "ultra realistic",
        고해상도: "high resolution",
        "19세기 초상화": "19th century portrait",
        초상화: "portrait",
        디즈니: "style of Disney",
        "요시다 아키히토 화풍": "by Akihito Yoshida",
        "신카이 마코도 화풍": "makoto shinkai style",
        유화: "oil painting",
        "아이폰 14 프로로 촬영": "from new iPhone 14 pro",
        "레오나르도 다빈치 화풍": "painted by Leonardo da Vinci",
        "3D": "3d rendered",
        상세함: "highly detailed",
        "연필 그림": "Pencil Art",
        애니메이션: "anime",
        "일본 애니 배경": "japan animation’s background",
        미래지향적: "futuristic",
        알록달록: "colorful",
        "디지털 일러스트": "a digital Illustration",
        일러스트: "illustration",
        지브리: "ghibli inspired",
        "무광 페인팅": "matte painting trending on artstation HQ",
        "시원한 색": "Cool Color Palette",
        "따뜻한 색": "Warm Color Palette",
      },
    },
  }

  const goToNext = () => {
    setLevel(level + 1)
  }

  const uploadResult = async () => {
    const result = []
    const place = selectedWordList[0]
    const doing = selectedWordList[1]
    const property = selectedWordList[2]
    const paint = selectedWordList[3]
    result.push(expressionSelectPage[7]["selections"][property])
    result.push(expressionSelectPage[5]["selections"][doing])
    result.push(expressionSelectPage[3]["selections"][place])
    result.push(expressionSelectPage[9]["selections"][paint])
    const response = await api.user.expression(result)
    //await api.expression(result)
    console.log(response)
  }

  return (
    <div className={styles.ExpressionPage}>
      {level === 1 ? <ExpressionStart goToNext={goToNext} /> : null}
      {level === 2 ? (
        <ExpressionText
          goToNext={goToNext}
          selectedWordList={selectedWordList}
          data={expressionTextPage[level]}
        />
      ) : null}
      {level === 3 ? (
        <ExpressionSelections
          addWord={addWord}
          data={expressionSelectPage[level]}
        />
      ) : null}
      {level === 4 ? (
        <ExpressionText
          goToNext={goToNext}
          selectedWordList={selectedWordList}
          data={expressionTextPage[level]}
        />
      ) : null}
      {level === 5 ? (
        <ExpressionSelections
          addWord={addWord}
          data={expressionSelectPage[level]}
        />
      ) : null}
      {level === 6 ? (
        <ExpressionText
          goToNext={goToNext}
          selectedWordList={selectedWordList}
          data={expressionTextPage[level]}
        />
      ) : null}
      {level === 7 ? (
        <ExpressionSelections
          addWord={addWord}
          data={expressionSelectPage[level]}
        />
      ) : null}
      {level === 8 ? (
        <ExpressionText
          goToNext={goToNext}
          selectedWordList={selectedWordList}
          data={expressionTextPage[level]}
        />
      ) : null}
      {level === 9 ? (
        <ExpressionSelections
          addWord={addWord}
          data={expressionSelectPage[level]}
        />
      ) : null}

      {level === 10 ? (
        <ExpressionResult
          results={selectedWordList}
          selectedWordList={selectedWordList}
          uploadResult={uploadResult}
        />
      ) : null}
    </div>
  )
}

export default ExpressionPage
