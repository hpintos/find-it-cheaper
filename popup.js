function createAppState() {
  let wallapopEnabled = false;
  let milanunciosEnabled = false;

  const toggleWallapop = () => {
    wallapopEnabled = !wallapopEnabled;
  };
  const toggleMilanuncios = () => {
    milanunciosEnabled = !milanunciosEnabled;
  };
  const isWallaPopEnabled = () => wallapopEnabled;
  const isMilanunciosEnabled = () => milanunciosEnabled;

  return {
    toggleWallapop,
    toggleMilanuncios,
    isWallaPopEnabled,
    isMilanunciosEnabled,
  };
}

const appState = createAppState();

const toggleSwitchWp = document.querySelector("#toggle-switch-wp");
const toggleSwitchMa = document.querySelector("#toggle-switch-ma");

const sendMessage = async ({ provider, enabled }) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, { provider, enabled });
  // do something with response here, not outside the function
  console.log(response);
};

const PROVIDER = {
  WALLAPOP: "wallapop",
  MILANUNCIOS: "milanuncios",
};

toggleSwitchWp.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
  appState.toggleWallapop();
  sendMessage({
    provider: PROVIDER.WALLAPOP,
    enabled: appState.isWallaPopEnabled(),
  });
});
toggleSwitchMa.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
  appState.toggleMilanuncios();
  sendMessage({
    provider: PROVIDER.MILANUNCIOS,
    enabled: appState.isMilanunciosEnabled(),
  });
});
