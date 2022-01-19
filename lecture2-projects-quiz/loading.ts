{
  /**
   * Print Loading State
   */
  type LoadingState = {
    state: "loading";
  };

  type SuccessState = {
    state: "success";
    response: {
      body: string;
    };
  };

  type FailState = {
    state: "fail";
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  function my_printLoginState(state: ResourceLoadState) {
    switch (state.state) {
      case "loading":
        console.log(`👀 ${state.state}`);
        break;
      case "success":
        console.log(`😃 ${state.response.body}`);
        break;
      case "fail":
        console.log(`😱 ${state.reason}`);
        break;
    }
  }

  my_printLoginState({ state: "loading" }); // 👀 loading...
  my_printLoginState({ state: "success", response: { body: "loaded" } }); // 😃 loaded
  my_printLoginState({ state: "fail", reason: "no network" }); // 😱 no network
}
