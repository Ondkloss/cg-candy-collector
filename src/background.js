chrome.browserAction.setBadgeBackgroundColor({ color: '#F00' })

const CANDY_URL = 'https://www.coingecko.com/account/candy'

const output = text => {
  const datetime = new Date().toLocaleString(navigator.language)
  console.log(`[${datetime}]`, text)
}

const checkCandyTabOpen = () => {
  chrome.tabs.query({
    url: CANDY_URL + '*'
  }, result => setBadgeText(result))
}

const setBadgeText = tabs => {
  if (tabs.length > 0) {
    chrome.browserAction.setBadgeText({ text: '' })
    chrome.browserAction.setTitle({ title: chrome.i18n.getMessage('appName') })
  }
  else {
    chrome.browserAction.setBadgeText({ text: '!!' })
    chrome.browserAction.setTitle({ title: chrome.i18n.getMessage('warning') })
  }
}

const evaluateTabOpening = tabs => {
  if (tabs.length > 0) {
    console.log(tabs)
    chrome.tabs.update(tabs[0].id, { selected: true })
  }
  else {
    chrome.tabs.create({ url: CANDY_URL })
  }

  checkCandyTabOpen()
}

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({
    url: CANDY_URL + '*'
  }, result => evaluateTabOpening(result))
})

chrome.runtime.onMessage.addListener((request) => {
  output(request)
})

setInterval(checkCandyTabOpen, 5000)
checkCandyTabOpen()
