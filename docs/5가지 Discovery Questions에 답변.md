# 초기화 단계 진행 작업을 시작하기 위해 권한과 목표를 명확히 해야 합니다. 프로토콜 절차에 따라, 다음 5가지 Discovery Questions에 답변

1. North Star: 이 프로젝트의 단 하나의 궁극적인 목표(결과물)는 무엇입니까?
   1) OPiC AL 레벨의 한국인 일본어 학습자를 위한 일본어 단어암기앱 (내가 만든 holavoca의 UI/UX를 기반으로)
      1) /home/ikyoon/proj/holavoca 참고해서 만들기.
   2) 안드로이드(chrome, edge, brave), 아이폰(safari) 모바일용 웹앱
   3) chatgpt에서 생성된 채팅의 구어체 단어, 표현을 학습하는 앱
      1) chatgpt에서 복/붙한 텍스트는 자유로운 스타일의 일본어 단어/표현을 설명한 채팅이므로, 문맥에 따라 단어, 표현을 추출해야 함
      2) 우선 JSON 구조를 잘 잡아서, 다른 채팅의 데이터들도 계속 추가할 수 있도록 해야 함.
2. Integrations: 어떤 외부 서비스들(예: Slack, Shopify 등)과 연동해야 하나요? 연동을 위한 API 키는 준비되어 있습니까?
   1) firestore: API키는 mcp를 통해 얻을 수 있음.
   2) github에 sync
   3) google cloud에 deploy: API키는 mcp를 통해 얻을 수 있음.
   4) 필요한 AI, cloud API는 가능하면 구글 생태계를 사용해줘: API키는 mcp를 통해 얻을 수 있음.
3. Source of Truth: 핵심 데이터의 원본은 어디에 저장되며 관리됩니까?
   1) JSON 파일로 로컬에서 먼저 작업 후, 작업 완료 시 firestore에 sync
   2) firestore에 저장된 데이터가 변경된 경우, 변경된 데이터가 들어있는 JSON파일을 구글 클라우드 deploy서버에 저장하고, 웹 브라우져가 구동되어 접속되면 이 변경분을 로컬 JSON파일에 반영
4. Delivery Payload: 최종 결과물은 어떤 형태(Payload)로, 어디로 전달되어야 합니까?
   1) 단어장 웹앱으로 전달
5. Behavioral Rules: 시스템이 작동 시 준수해야 하는 행동 규칙, 톤앤매너, 금지 사항(Do Not) 등 특별한 제약 조건이 있습니까?
   1) 우선, 기존에 개발된 holavoca의 UI/UX를 철저히 분석해
   2) 한국인 학습자가 자주 틀리는 표현은 하일라이트해서 보여주는 기능 추가
   3) 유닛을 15개로 나눌때, 유닛1은 가장 쉬운 단어/표현, 유닛15에는 가장 어려운 단어/표현이 배정되어야해.
