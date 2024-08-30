# 🔄 직접 정의한 나만의 TDD CYCLE

1. 전체 문제가 해결되었을 때, 어떤 상태일지를 `한 문장` 으로 적어보기
2. 적당한 난이도로 문제를 쪼개고 변행해 기능 단위로 분리하기
    - 단, 이 때 1의 한 문장으로 부터 `(1) 가장 작은 버전`과 `(2) 핵심 기능` 을 추출한다.
        - ✨ 가장 작은 버전 = 기능이 구현될 수 있는 최소 단위
        - ✨ 핵심 기능 = 복잡성을 제거하고 남은 프로젝트의 주요 기능
    - 먼저 `가장 작은 버전의 핵심 기능부터 구현` 하고, 이후 다시 2로 돌아왔을 때, 현재 구현 기능에서 `복잡성을 늘려가면서 디테일`을 잡는다.
        - ✨ 복잡성을 줄이기 위해서 `UI 로직` 과 `도메인 로직` 은 되도록이면 분리해주자.
    - 최종적으로 1 상태가 되었을 때, TDD 사이클을 중단하면 된다.
3. 핵심과 가까우면서 지금 내 상태에서 할 수 있는 기능을 2에서 뽑아낸 기능 중 선택한다.

    **[선택 기준]**

    ✅ 해당 기능 구현 시, 향후 구현이 더 편해지는가?

    ✅ 해당 기능 구현 시, 1의 문장 상태에 더 가까워지는가?

4. 선택한 기능에 대해 결과가 어떻게 나와야 하는지를 고려하며, `구체화`, `시뮬레이션` 한다.
    - 선택 기능 내부 `세부 기능`들을 bullet point로 작성한다
        - 이 때, 확장성에 대한 고려는 접어두고 빠른 구현에 초점을 맞추자. 확장성은 이후 리팩토링 과정에서 고려해준다.
    - `edge case`를 뽑아내 check point로 작성하라.
5. 세부 기능 단위로 실패하는 테스트 코드를 작성하고 이를 통과하도록 코드를 작성한다.
    - 모든 세부 기능 구현이 끝나 선택 기능 하나를 완료하면 6으로 이동한다.
6. 기능 단위로 리팩토링을 진행한다.
    - 리팩토링 시, `(1) 중복 제거` `(2) 가독성` `(3) 확장성` `(4) 성능`을 고려한다.
        - 중복 제거: `모듈화`가 필요한 부분을 처리한다.
        - 가독성:
            - `의도가 잘 드러나는` 코드인지 점검한다.
            - `목적에 맞는` 메소드/함수를 사용해서 기능을 구현하였는지 점검한다.
        - 확장성:
            - 향후 `요구사항 변경이 가능한 지점`을 체크하여, 외부로 뽑아낸다.
7. 다시 2, 3 중 하나로 가서 사이클을 반복한다.